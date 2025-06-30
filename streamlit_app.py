# 12.2

import streamlit as st
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import sys
import os
import json
from datetime import datetime
import glob
import random
import base64
import shutil 
import subprocess

st.set_page_config(
    page_title="Custom Tokamak - Vacuum Vessel Design",
    layout="wide"
)

# Accessing OpenFUSIONToolkit 
home_dir = os.path.expanduser("~")
oft_root_path = os.path.join(home_dir, "OpenFUSIONToolkit/install_release")
os.environ["OFT_ROOTPATH"] = oft_root_path
tokamaker_python_path = os.getenv("OFT_ROOTPATH")
if tokamaker_python_path is not None:
    sys.path.append(os.path.join(tokamaker_python_path, "python"))

from OpenFUSIONToolkit.TokaMaker.util import create_isoflux

# Local implementation of resize_polygon function (copied from AOE_tokamaker)
def resize_polygon(points, dx):
    new_points = np.empty(np.shape(points))
    for i in range(np.shape(points)[0]):
        if i==0:
            last = points[-1,:]
            next = points[i+1,:]
        elif i == np.shape(points)[0]-1:
            last = points[-2,:]
            next = points[0,:]
        else:
            last = points[i-1,:]
            next = points[i+1,:]
        vec = next - last
        vec_norm = np.linalg.norm(vec)
        vec_unit = vec / vec_norm
        vec_dx = vec_unit * dx
        new_points[i,:] = last + vec_dx
    return new_points

# Function to check if point is inside polygon using ray casting
def point_in_polygon(point, polygon):
    x, y = point
    n = len(polygon)
    inside = False
    p1x, p1y = polygon[0]
    for i in range(1, n + 1):
        p2x, p2y = polygon[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside

# Function to validate and fix coil positions
def validate_coil_positions(coil_coords, vv_coords, plasma_boundary, safety_margin=0.5):
    validated_coords = []
    vv_array = np.array(vv_coords)
    
    for coil in coil_coords:
        r, z = coil
        
        # Check if coil is inside vacuum vessel
        if point_in_polygon([r, z], vv_coords):
            # Move coil outside vacuum vessel
            # Find the closest point on VV boundary and move outward
            distances = np.sqrt((vv_array[:, 0] - r)**2 + (vv_array[:, 1] - z)**2)
            closest_idx = np.argmin(distances)
            closest_vv_point = vv_array[closest_idx]
            
            # Vector from closest VV point to coil
            direction = np.array([r - closest_vv_point[0], z - closest_vv_point[1]])
            if np.linalg.norm(direction) > 0:
                direction = direction / np.linalg.norm(direction)
            else:
                direction = np.array([1, 0])  # Default direction
            
            # Move coil outside VV with safety margin
            new_r = closest_vv_point[0] + direction[0] * safety_margin
            new_z = closest_vv_point[1] + direction[1] * safety_margin
            validated_coords.append([new_r, new_z])
        else:
            validated_coords.append([r, z])
    
    return validated_coords

# Initialize session state
if 'vv_coords' not in st.session_state:
    st.session_state.vv_coords = [
        [3.25, -0.75], [3.75, -1.25], [4.5, -1.85], [6.0, -1.85], 
        [6.0, 1.85], [4.5, 1.85], [3.75, 1.25], [3.25, 1.0]
    ]

if 'coil_coords' not in st.session_state:
    # Updated coil positions to be outside the vacuum vessel
    st.session_state.coil_coords = [
        [4.0, 2.5], [4.0, -2.5], [5.25, 2.25], [5.25, -2.25],
        [6.5, 0.5], [6.5, -0.5], [2.8, 0.25], [2.8, -0.25]
    ]

if 'editing_point' not in st.session_state:
    st.session_state.editing_point = None

if 'original_coords' not in st.session_state:
    st.session_state.original_coords = None

st.title("Custom Tokamak - Vacuum Vessel Design")
col1, col2 = st.columns([1, 2])

with col1:
    st.header("Plasma Parameters")
    
    major_radius = st.slider("Major Radius (m)", 3.0, 6.0, 4.55, 0.05)
    minor_radius = st.slider("Minor Radius (m)", 0.8, 2.0, 1.2, 0.05)
    elongation = st.slider("Elongation", 1.0, 2.0, 1.4, 0.05)
    triangularity = st.slider("Triangularity", -0.8, 0.8, -0.5, 0.05)
    
    col_a, col_b = st.columns(2)
    
    with col_a:
        if st.button("Add VV Point", key="add_vv"):

            point_1 = random.choice(st.session_state.vv_coords)
            # Find the index of point_1 in the list
            point_1_index = st.session_state.vv_coords.index(point_1)
            # Create array without point_1
            remaining_coords = [coord for i, coord in enumerate(st.session_state.vv_coords) if i != point_1_index]
            point_2 = random.choice(remaining_coords)

            avg_r = (point_1[0] + point_2[0]) / 2
            avg_z = (point_1[1] + point_2[1]) / 2

            st.session_state.vv_coords.append([avg_r, avg_z])
            st.rerun()
        
        # if st.button("Add Coil", key="add_coil"):
        #     if len(st.session_state.coil_coords) < 8:

        #         point_1 = random.choice(st.session_state.coil_coords)
        #         point_1_index = st.session_state.coil_coords.index(point_1)
        #         remaining_coords = [coord for i, coord in enumerate(st.session_state.coil_coords) if i != point_1_index]
        #         point_2 = random.choice(remaining_coords)

        #         avg_r = (point_1[0] + point_2[0]) / 2
        #         avg_z = (point_1[1] + point_2[1]) / 2

        #         st.session_state.coil_coords.append([avg_r,avg_z])
        #         st.rerun()
        #     else: 
        #         st.warning("You can only have 8 coils maximum")
        
    
    with col_b:
        if st.button("Delete VV Point", key="del_vv"): 
            if len(st.session_state.vv_coords) > 4:
                st.session_state.vv_coords.pop()
            else:
                st.warning("You can only have 4 VV points minimum")
            st.rerun()


        # if st.button("Delete Last Coil", key="del_coil"): 
        #     if len(st.session_state.coil_coords) > 4:
        #         st.session_state.coil_coords.pop()
        #     else:
        #         st.warning("You can only have 4 coils minimum")
        #     st.rerun()
        

    # Advanced Settings Section
    st.subheader("Advanced Settings")
    
    # Initialize session state for advanced settings visibility
    if 'show_advanced' not in st.session_state:
        st.session_state.show_advanced = False
    
    # Toggle button for advanced settings
    if st.button("⚙️ Show Advanced Parameters" if not st.session_state.show_advanced else "⚙️ Hide Advanced Parameters"):
        st.session_state.show_advanced = not st.session_state.show_advanced
        st.rerun()
    
    # Show advanced parameters if toggled on
    if st.session_state.show_advanced:
        st.markdown("**Magnetic Field & Current Parameters**")
        
        B0 = st.number_input("B0 (Toroidal Magnetic Field)", value=11.0, format="%.2f")
        Ip_target = st.number_input("Ip_target", value=8E6, format="%.0f")
        Ip_ratio_target = st.number_input("Ip_ratio_target", value=0.333, format="%.3f")
        ffp_alpha = st.number_input("ffp_alpha", value=2.15, format="%.2f")
        ffp_gamma = st.number_input("ffp_gamma", value=1.7, format="%.2f")
        pp_alpha = st.number_input("pp_alpha", value=2.15, format="%.2f")
        pp_gamma = st.number_input("pp_gamma", value=1.7, format="%.2f")
    else:
        # Set default values when advanced settings are hidden
        B0 = 11.0
        Ip_target = 8E6
        Ip_ratio_target = 0.333
        ffp_alpha = 2.15
        ffp_gamma = 1.7
        pp_alpha = 2.15
        pp_gamma = 1.7

with col2:
    st.header("Vacuum Vessel Design")
    
    # Generate plasma boundary
    boundary_pts = create_isoflux(30, major_radius, 0.0, minor_radius, elongation, triangularity)
    
    # Create vacuum vessel arrays
    vv_boundary = np.array(st.session_state.vv_coords)
    vv_outer = resize_polygon(vv_boundary, 0.04)    
    
    # Create Plotly figure
    fig = go.Figure()
    
    # Add vacuum vessel outer boundary (filled)
    fig.add_trace(go.Scatter(
        x=np.append(vv_outer[:, 0], vv_outer[0, 0]),  # Close the polygon
        y=np.append(vv_outer[:, 1], vv_outer[0, 1]),
        fill='toself',
        fillcolor='rgba(25,31,52,1.0)',
        line=dict(color='black', width=2),
        mode='lines',
        name='VV Outer',
        hoverinfo='skip'
    ))
    
    # Add vacuum vessel inner boundary (filled white)
    fig.add_trace(go.Scatter(
        x=np.append(vv_boundary[:, 0], vv_boundary[0, 0]),  # Close the polygon
        y=np.append(vv_boundary[:, 1], vv_boundary[0, 1]),
        fill='toself',
        fillcolor='white',
        line=dict(color='black', width=2),
        mode='lines',
        name='VV Inner',
        hoverinfo='skip'
    ))
    
    # Add plasma boundary (filled blue)
    fig.add_trace(go.Scatter(
        x=np.append(boundary_pts[:, 0], boundary_pts[0, 0]),  # Close the polygon
        y=np.append(boundary_pts[:, 1], boundary_pts[0, 1]),
        fill='toself',
        fillcolor='rgba(0,100,255,0.3)',
        line=dict(color='blue', width=2),
        mode='lines',
        name='Plasma',
        hoverinfo='skip'
    ))
    
    # clickable vacuum vessel points
    fig.add_trace(go.Scatter(
        x=[coord[0] for coord in st.session_state.vv_coords],
        y=[coord[1] for coord in st.session_state.vv_coords],
        mode='markers',
        marker=dict(
            size=15,
            color='orange',
            symbol='circle',
            line=dict(width=3, color='black')
        ),
        name='VV Points',
        customdata=['vv'] * len(st.session_state.vv_coords),
        hovertemplate='VV Point %{pointIndex}<br>R: %{x:.2f}<br>Z: %{y:.2f}<br>Click to edit<extra></extra>'
    ))
    
    # clickable coil points
    if len(st.session_state.coil_coords) > 0:
        coil_colors = []
        coil_names = []
        
        for i, (r, z) in enumerate(st.session_state.coil_coords):
            # Check if coil is properly positioned
            is_inside_vv = point_in_polygon([r, z], st.session_state.vv_coords)
            is_inside_plasma = point_in_polygon([r, z], boundary_pts.tolist())
            
            if is_inside_vv or is_inside_plasma:
                coil_colors.append('red')
                coil_names.append(f'Coil {i+1} (INVALID)')
            else:
                coil_colors.append('darkred')
                coil_names.append(f'Coil {i+1}')
        
        fig.add_trace(go.Scatter(
            x=[coord[0] for coord in st.session_state.coil_coords],
            y=[coord[1] for coord in st.session_state.coil_coords],
            mode='markers',
            marker=dict(
                size=18,
                color=coil_colors,
                symbol='circle',
                line=dict(width=3, color='black')
            ),
            name='Coils',
            customdata=['coil'] * len(st.session_state.coil_coords),
            hovertemplate='%{text}<br>R: %{x:.2f}<br>Z: %{y:.2f}<br>Click to edit<extra></extra>',
            text=coil_names
        ))
    
    # Configure layout
    fig.update_layout(
        width=800,
        height=600,
        xaxis_title="R (m)",
        yaxis_title="Z (m)",
        xaxis=dict(scaleanchor="y", scaleratio=1),
        yaxis=dict(scaleanchor="x", scaleratio=1),
        showlegend=True,
        dragmode='pan',
        hovermode='closest',
        clickmode='event+select'
    )
    
    # Display the plot and capture click events
    event = st.plotly_chart(fig, use_container_width=True, key="main_plot", on_select="rerun")
    
    # Add helpful legend instruction
    st.caption("💡 **Tip:** Click on any legend item (VV Outer, VV Inner, Plasma, VV Points, Coils) to show/hide that component")
    
    # Handle clicking on dots
    if event and 'selection' in event:
        
        if event['selection']['points']:
            point = event['selection']['points'][0]
            
            # Use the correct field names from the actual event structure
            curve_number = point.get('curve_number', -1)  # Changed from 'curveNumber'
            point_index = point.get('point_index', -1)    # Changed from 'pointIndex'
            
            # Try to set editing point for ANY curve/point combination
            if curve_number == 3:  # VV points
                st.session_state.editing_point = ('vv', point_index)
                # Store original coordinates for cancel functionality
                st.session_state.original_coords = st.session_state.vv_coords[point_index].copy()
                # Removed st.rerun() - let the natural flow continue to sliders
            elif curve_number == 4:  # Coil points
                st.session_state.editing_point = ('coil', point_index)
                # Store original coordinates for cancel functionality
                st.session_state.original_coords = st.session_state.coil_coords[point_index].copy()
                # Removed st.rerun() - let the natural flow continue to sliders
            else:
                st.write(f"❌ Unknown curve: {curve_number}")
    
    # Show editing interface with sliders if a point is selected
    if st.session_state.editing_point:
        
        point_type, idx = st.session_state.editing_point
        
        if point_type == 'vv':
            
            # Get current coordinates
            current_r = st.session_state.vv_coords[idx][0]
            current_z = st.session_state.vv_coords[idx][1]
            
            st.write(f"**Editing VV Point {idx + 1}**")
            if st.session_state.original_coords:
                st.caption(f"Original position: R={st.session_state.original_coords[0]:.2f}, Z={st.session_state.original_coords[1]:.2f}")
            
            # Create sliders with appropriate ranges
            col_slider_r, col_slider_z = st.columns(2)
            
            with col_slider_r:
                new_r = st.slider(
                    f"R Position (m)", 
                    min_value=0.5,
                    max_value=8.0, 
                    value=current_r, 
                    step=0.1,
                    key=f"slider_vv_r_{idx}"
                )
            
            with col_slider_z:
                new_z = st.slider(
                    f"Z Position (m)", 
                    min_value=-3.0, 
                    max_value=3.0, 
                    value=current_z, 
                    step=0.1,
                    key=f"slider_vv_z_{idx}"
                )
            
            # Control buttons
            col_done, col_cancel = st.columns(2)
            with col_done:
                if st.button("✓ Done Editing", key=f"done_vv_{idx}"):
                    # Apply the slider values to the coordinates
                    st.session_state.vv_coords[idx] = [new_r, new_z]
                    st.session_state.editing_point = None
                    st.session_state.original_coords = None
                    st.rerun()
            with col_cancel:
                if st.button("✗ Cancel", key=f"cancel_vv_{idx}"):
                    # Restore original coordinates
                    if st.session_state.original_coords is not None:
                        st.session_state.vv_coords[idx] = st.session_state.original_coords.copy()
                    st.session_state.editing_point = None
                    st.session_state.original_coords = None
                    st.rerun()
        
        elif point_type == 'coil':
            st.write(f"**Editing Coil {idx + 1}**")
            if st.session_state.original_coords:
                st.caption(f"Original position: R={st.session_state.original_coords[0]:.2f}, Z={st.session_state.original_coords[1]:.2f}")
            
            # Get current coordinates
            current_r = st.session_state.coil_coords[idx][0]
            current_z = st.session_state.coil_coords[idx][1]
            
            # Create sliders with appropriate ranges
            col_slider_r, col_slider_z = st.columns(2)
            
            with col_slider_r:
                new_r = st.slider(
                    f"R Position (m)", 
                    min_value=1.0, 
                    max_value=8.0, 
                    value=current_r, 
                    step=0.05,
                    key=f"slider_coil_r_{idx}"
                )
            
            with col_slider_z:
                new_z = st.slider(
                    f"Z Position (m)", 
                    min_value=-4.0, 
                    max_value=4.0, 
                    value=current_z, 
                    step=0.05,
                    key=f"slider_coil_z_{idx}"
                )
            
            # Show validation status for preview (using slider values)
            is_inside_vv = point_in_polygon([new_r, new_z], st.session_state.vv_coords)
            is_inside_plasma = point_in_polygon([new_r, new_z], boundary_pts.tolist())
            
            if is_inside_vv or is_inside_plasma:
                st.warning("⚠️ **Preview**: Coil would be inside vacuum vessel or plasma!")
            else:
                st.success("✅ **Preview**: Coil would be properly positioned outside.")
            
            # Control buttons
            col_done, col_cancel = st.columns(2)
            with col_done:
                if st.button("✓ Done Editing", key=f"done_coil_{idx}"):
                    # Apply the slider values to the coordinates
                    st.session_state.coil_coords[idx] = [new_r, new_z]
                    st.session_state.editing_point = None
                    st.session_state.original_coords = None
                    st.rerun()
            with col_cancel:
                if st.button("✗ Cancel", key=f"cancel_coil_{idx}"):
                    # Restore original coordinates
                    if st.session_state.original_coords is not None:
                        st.session_state.coil_coords[idx] = st.session_state.original_coords.copy()
                    st.session_state.editing_point = None
                    st.session_state.original_coords = None
                    st.rerun()
    

# Add reset button at the bottom
st.markdown("---")

# Add reset button at the bottom
col_reset1, col_reset2, col_reset3 = st.columns(3)
with col_reset1:
    if st.button("🔄 Reset Vacuum Vessel"):
        st.session_state.vv_coords = [
            [3.25, -0.75], [3.75, -1.25], [4.5, -1.85], [6.0, -1.85], 
            [6.0, 1.85], [4.5, 1.85], [3.75, 1.25], [3.25, 1.0]
        ]
        st.session_state.editing_point = None
        st.rerun()

with col_reset2:
    if st.button("🔄 Reset Coils"):
        st.session_state.coil_coords = [
            [4.0, 2.5], [4.0, -2.5], [5.25, 2.25], [5.25, -2.25],
            [6.5, 0.5], [6.5, -0.5], [2.8, 0.25], [2.8, -0.25]
        ]
        st.session_state.editing_point = None
        st.rerun()

with col_reset3:
    if st.button("🔄 Reset All"):
        st.session_state.vv_coords = [
            [3.25, -0.75], [3.75, -1.25], [4.5, -1.85], [6.0, -1.85], 
            [6.0, 1.85], [4.5, 1.85], [3.75, 1.25], [3.25, 1.0]
        ]
        st.session_state.coil_coords = [
            [4.0, 2.5], [4.0, -2.5], [5.25, 2.25], [5.25, -2.25],
            [6.5, 0.5], [6.5, -0.5], [2.8, 0.25], [2.8, -0.25]
        ]
        st.session_state.editing_point = None
        st.rerun()
    
# Add reset button at the bottom
st.markdown("---")

# Add Lock Design button before reset buttons
st.header("🔒 Lock Design & Generate Analysis")
col_lock, col_run, col_status = st.columns([1, 1, 2])

with col_lock:
    if st.button("🔒 Lock Design", type="primary", help="Save current design and prepare for analysis"):
        # Create design data structure
        design_data = {
            "timestamp": datetime.now().strftime("%Y%m%d_%H%M%S"),
            "plasma_parameters": {
                "major_radius": major_radius,
                "minor_radius": minor_radius,
                "elongation": elongation,
                "triangularity": triangularity
            },
            "advanced_settings": {
                "B0": B0,
                "Ip_target": Ip_target,
                "Ip_ratio_target": Ip_ratio_target,
                "ffp_alpha": ffp_alpha,
                "ffp_gamma": ffp_gamma,
                "pp_alpha": pp_alpha,
                "pp_gamma": pp_gamma
            },
            "vacuum_vessel": {
                "boundary_coordinates": st.session_state.vv_coords
            },
            "coil_coordinates": st.session_state.coil_coords,
            "validation": {
                "valid_coils": [],
                "invalid_coils": []
            }
        }
        
        # Validate coil positions
        boundary_pts = create_isoflux(30, major_radius, 0.0, minor_radius, elongation, triangularity)
        for i, (r, z) in enumerate(st.session_state.coil_coords):
            is_inside_vv = point_in_polygon([r, z], st.session_state.vv_coords)
            is_inside_plasma = point_in_polygon([r, z], boundary_pts.tolist())
            
            if is_inside_vv or is_inside_plasma:
                design_data["validation"]["invalid_coils"].append(i)
            else:
                design_data["validation"]["valid_coils"].append(i)
        
        # Save to JSON file
        examples_dir = "examples"
        testing_dir = os.path.join(examples_dir, "testing_1")

        # Create directories if they don't exist
        os.makedirs(testing_dir, exist_ok=True)

        design_file = f"design_{design_data['timestamp']}.json"
        design_file_path = os.path.join(testing_dir, design_file)
    
        with open(design_file_path, 'w') as f:
            json.dump(design_data, f, indent=2)
        
        # Store in session state for status display
        st.session_state.locked_design = design_data
        st.session_state.design_file = design_file_path
        
        st.success(f"✅ Design locked and saved to: {design_file_path}")
        st.rerun()
                                                 

with col_run:
    if 'locked_design' in st.session_state:
        if st.button("🚀 Run Analysis", type="secondary", help="Execute AOE_tokamaker with current design"):
            with st.spinner("Running AOE_tokamaker analysis..."):
                try:
                    # Get the current working directory and construct the path to tokamak_psp_2025
                    current_dir = os.getcwd()
                    
                    # Check if we're already in the tokamak_psp_2025 directory
                    if os.path.basename(current_dir) == "tokamak_psp_2025":
                        # We're already in the tokamak directory
                        tokamak_dir = current_dir
                    else:
                        # We're in the parent directory, so join with tokamak_psp_2025
                        tokamak_dir = os.path.join(current_dir, "tokamak_psp_2025")
                    
                    # Verify the directory exists and contains the notebook
                    notebook_path = os.path.join(tokamak_dir, "AOE_tokamaker.ipynb")
                    if not os.path.exists(notebook_path):
                        st.error(f"❌ AOE_tokamaker.ipynb not found at: {notebook_path}")
                        st.error(f"Current working directory: {current_dir}")
                        st.error(f"Tokamak directory: {tokamak_dir}")
                        st.stop()
                    
                    # Run the AOE_tokamaker script
                    result = subprocess.run([
                        "jupyter", 
                        "nbconvert",
                        "--execute",
                        "--to",
                        "notebook",
                        "--inplace",
                        "AOE_tokamaker.ipynb",
                    ], cwd=tokamak_dir, capture_output=True, text=True)
                
                    if result.returncode == 0:
                        st.success("✅ Analysis completed successfully!")
                        st.session_state.analysis_completed = True
                        st.session_state.output_folder = "tokamak_psp_2025/examples/testing_1"
                        st.rerun()
                    else:
                        st.error("❌ Analysis failed. Check console for errors.")
                        st.error(result.stderr)
                        
                except Exception as e:
                    st.error(f"❌ Error running analysis: {e}")
    else:
        st.info("💡 Lock design first to enable analysis")

with col_status:
    if 'locked_design' in st.session_state:
        design = st.session_state.locked_design
        st.write("**🔒 Current Locked Design:**")
        st.write(f"• Timestamp: {design['timestamp']}")
        st.write(f"• Major Radius: {design['plasma_parameters']['major_radius']:.2f} m")
        st.write(f"• Minor Radius: {design['plasma_parameters']['minor_radius']:.2f} m")
        st.write(f"• Elongation: {design['plasma_parameters']['elongation']:.1f}")
        st.write(f"• Triangularity: {design['plasma_parameters']['triangularity']:.1f}")
        st.write(f"• Valid Coils: {len(design['validation']['valid_coils'])}/8")
        
        if design['validation']['invalid_coils']:
            st.warning(f"⚠️ Invalid coil positions: {design['validation']['invalid_coils']}")
        else:
            st.success("✅ All coils positioned correctly")
    else:
        st.info("💡 Lock your design to save parameters and proceed with analysis")

# Display analysis results if available
if 'analysis_completed' in st.session_state and st.session_state.analysis_completed:
    st.markdown("---")
    st.header("📊 Analysis Results")
    
    # Get the current working directory and construct the proper path to output folder
    current_dir = os.getcwd()
    
    # Check if we're already in the tokamak_psp_2025 directory
    if os.path.basename(current_dir) == "tokamak_psp_2025":
        # We're already in the tokamak directory
        output_folder = os.path.join(current_dir, "examples", "testing_1")
    else:
        # We're in the parent directory, so join with tokamak_psp_2025
        output_folder = os.path.join(current_dir, "tokamak_psp_2025", "examples", "testing_1")
    
    if os.path.exists(output_folder):
        # Look for generated images in the output folder
        image_files = []
        for ext in ['*.png', '*.gif']:
            image_files.extend(glob.glob(os.path.join(output_folder, ext)))
        
        if image_files:
            st.write(f"**Analysis output from:** `{output_folder}`")
            st.write(f"**Found {len(image_files)} image(s):**")
            
            # Separate GIF files from other images for different display handling
            gif_files = [f for f in image_files if f.lower().endswith('.gif')]
            other_images = [f for f in image_files if not f.lower().endswith('.gif')]
            
            # Display other images in a grid
            if other_images:
                cols = st.columns(2)
                for i, img_path in enumerate(other_images):
                    col_idx = i % 2
                    with cols[col_idx]:
                        try:
                            filename = os.path.basename(img_path)
                            from PIL import Image
                            img = Image.open(img_path)
                            st.image(img, caption=filename, use_container_width=True)
                        except Exception as e:
                            st.error(f"Error loading {img_path}: {e}")
                        # Display GIF files in full width

            # if gif_files and other_images:
            #     st.markdown("<br>", unsafe_allow_html=True)
            
            for gif_path in gif_files:
                try:
                    filename = os.path.basename(gif_path)
                    
                    # Use base64 encoding for proper GIF display
                    with open(gif_path, "rb") as gif_file:
                        contents = gif_file.read()
                        data_url = base64.b64encode(contents).decode("utf-8")
                    
                    # Display GIF using HTML with base64 encoding - full width
                    st.markdown(
                        f'<img src="data:image/gif;base64,{data_url}" alt="{filename}" style="width: 95%; max-width: 95%;">',
                        unsafe_allow_html=True,
                    )
                    
                    # Add caption below (matches st.image caption style)
                    st.caption(filename)
                    
                except Exception as e:
                    st.error(f"Error loading {gif_path}: {e}")

        else:
            st.warning(f"No images found in the output folder: {output_folder}")
            # Debug information
            st.write("**Debug info:**")
            st.write(f"- Current working directory: {current_dir}")
            st.write(f"- Looking for images in: {output_folder}")
            st.write(f"- Folder exists: {os.path.exists(output_folder)}")
            if os.path.exists(output_folder):
                all_files = os.listdir(output_folder)
                st.write(f"- Files in folder: {all_files}")
    else:
        st.error(f"Output folder not found: {output_folder}")
        # Debug information
        st.write("**Debug info:**")
        st.write(f"- Current working directory: {current_dir}")
        st.write(f"- Expected output folder: {output_folder}")
    
    # Add button to clear results
    if st.button("🗑️ Clear Results"):
        # Clear analysis-related session state
        if 'analysis_completed' in st.session_state:
            del st.session_state.analysis_completed
        if 'output_folder' in st.session_state:
            del st.session_state.output_folder
        if 'locked_design' in st.session_state:
            del st.session_state.locked_design
        if 'design_file' in st.session_state:
            del st.session_state.design_file

        # Clear files
        files = glob.glob('examples/testing_1/*')
        for f in files:
            if os.path.isfile(f):
                os.remove(f)
            elif os.path.isdir(f):
                shutil.rmtree(f)
        
        # Force a complete page reload by clearing more session state
        st.cache_data.clear()
        st.rerun()