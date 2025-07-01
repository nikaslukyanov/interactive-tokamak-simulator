# Tokamak Plasma Visualizing Tool Kit

A comprehensive tokamak plasma simulation toolkit built on TokaMaker from the OpenFUSIONToolkit, designed for visualizing of vertical displacement events. 

## Overview

This project provides a complete framework for tokamak plasma simulation, including:
- Interactive web-based vacuum vessel design and visualization
- Plasma equilibrium calculations using the Grad-Shafranov equation
- Real-time plasma parameter configuration and validation
- Poloidal field coil placement with geometric constraint checking
- Computational mesh generation with configurable resolution
- Automated simulation execution and results visualization
- Timestamped simulation output management

## Interactive Visualizer

The Streamlit-based interactive visualizer (`streamlit_app.py`) provides a comprehensive web interface for tokamak design and analysis:

### Key Features
- **Real-time Plasma Configuration**: Interactive sliders for major radius, minor radius, elongation, and triangularity
- **Advanced Parameter Control**: Configurable magnetic field parameters (B0, Ip_target, ffp_alpha, etc.)
- **Interactive Vacuum Vessel Design**: Click-and-drag interface for vacuum vessel boundary modification
- **Intelligent Coil Placement**: Drag-and-drop coil positioning with automatic validation
- **Live Visualization**: Real-time Plotly-based cross-sectional views with plasma, vacuum vessel, and coil rendering
- **Design Validation**: Automatic checking of geometric constraints (coils outside vessel, plasma containment)
- **One-Click Analysis**: Direct integration with AOE_tokamaker notebook execution
- **Results Dashboard**: Automatic loading and display of simulation outputs (images, GIFs, data)

### Visualizer Workflow
1. **Design Phase**: Configure plasma parameters and modify vacuum vessel geometry
2. **Coil Placement**: Position poloidal field coils with real-time validation feedback
3. **Lock Design**: Save current configuration to JSON for reproducibility
4. **Run Analysis**: Execute AOE_tokamaker simulation with one click
5. **View Results**: Automatic display of generated plots and animations

### Prerequisites
- Python 3.x
- OpenFUSIONToolkit
- Standard scientific Python packages

### Setup
1. Install OpenFUSIONToolkit following their documentation (v1.0.0-beta5 version released Jan 23 2025)
2. Clone this repository
3. Install required packages: `pip install streamlit plotly pillow`
4. Ensure OpenFUSIONToolkit is accessible in your Python path
5. **Launch Interactive Visualizer**: `streamlit run streamlit_app.py`
6. **Alternative**: Use Jupyter notebook directly with `AOE_tokamaker.ipynb`

### Using the Interactive Visualizer
1. Launch with `streamlit run streamlit_app.py`
2. Configure plasma parameters using the left sidebar sliders
3. Click on vacuum vessel points (orange) or coil points (red/dark red) to edit positions
4. Use "Add VV Point" or "Delete VV Point" to modify vacuum vessel complexity
5. Enable "Advanced Settings" for detailed magnetic field parameter control
6. Click "🔒 Lock Design" to save your configuration
7. Click "🚀 Run Analysis" to execute the simulation
8. View results automatically displayed below

### Basic Simulation (Jupyter Notebook)
1. Open `AOE_tokamaker.ipynb` in Jupyter Notebook/Lab
2. Configure simulation parameters in the initial cells
3. Run cells sequentially to:
   - Set up tokamak geometry
   - Define plasma parameters
   - Place poloidal field coils
   - Solve Grad-Shafranov equation
   - Generate visualizations

### Core Simulation Capabilities
- **Grad-Shafranov Solver**: Advanced plasma equilibrium calculations using TokaMaker
- **Configurable Mesh Resolution**: Customizable resolution for plasma, coil, vacuum vessel, and vacuum domains 
- **Geometric Modeling**: Complete tokamak geometry setup with vacuum vessel specification
- **Plasma Shaping**: Isoflux boundary point generation for precise plasma shape definition
- **Interactive Design**: Web-based interface for real-time parameter adjustment and visualization

### Plasma Parameters for the tokamak example (Negative Triangulation) 
- Major radius: 4.55
- Minor radius: 1.2
- Elongation: 1.4
- Triangularity: -0.5

### Coil System
- Support for 8 poloidal field coils
- Precise (R,Z) coordinate specification
- Geometric constraint validation (coils positioned outside vacuum vessel)

### Visualization & Output
- **Interactive Plotly Interface**: Real-time cross-sectional views with zoom, pan, and legend control
- **Plasma Boundary Rendering**: Blue-filled plasma cross-section with isoflux boundaries
- **Vacuum Vessel Visualization**: Gray-filled vessel walls with inner/outer boundaries
- **Coil Position Mapping**: Color-coded coil locations with validation status
- **Automated Results Display**: Automatic loading of simulation outputs (PNG, GIF)
- **Timestamped Output Management**: Organized folder structure for reproducible results

### Customization
- **Interactive Parameter Adjustment**: Real-time sliders for all plasma and magnetic field parameters
- **Vacuum Vessel Design**: Click-to-edit vertex positions with add/delete point functionality
- **Coil Configuration**: Drag-and-drop positioning with live constraint validation
- **Advanced Settings**: Toggle-able expert parameters for detailed magnetic field control
- **Design Export**: JSON-based configuration saving for reproducibility

### Output Management
The system automatically creates designs and saves them in the testing_1 folder 
- Contains simulation results, plots, and a json configuration file

### Geometric Constraints
- Plasma boundary must fit within vacuum vessel
- Coils must be positioned outside vacuum vessel boundaries
- Real-time validation with visual feedback in the interactive interface
- Automatic geometric relationship checking and correction

### Computational Mesh
- Structured mesh generation for different domains
- Configurable resolution for optimization vs. accuracy trade-offs
- Support for complex vacuum vessel geometries designed in the visualizer

### Visualization Tools
- **Interactive Plotly Interface**: Web-based real-time visualization with zoom, pan, and selection
- **Cross-sectional Plasma Views**: Live plasma boundary updates with parameter changes
- **Magnetic Flux Surface Plotting**: Automated generation and display
- **Coil and Vessel Boundary Visualization**: Color-coded validation and positioning feedback
- **Results Dashboard**: Automatic image and animation loading with organized display

## Workflows

### Interactive Design Workflow (Recommended)
1. Launch visualizer: `streamlit run streamlit_app.py`
2. Design tokamak geometry interactively
3. Lock design and run analysis with one click
4. View results automatically in the web interface

### Traditional Jupyter Workflow
1. Open `AOE_tokamaker.ipynb`
2. Configure parameters manually in code cells
3. Execute simulation step-by-step
4. View results in notebook outputs

## Examples

The `examples/` directory contains:
- **Simulation Runs**: Timestamped folders with complete simulation outputs
- **VDE Analysis**: Vertical Displacement Event studies (`CUTE_VDE_ex.ipynb`)
- **General Simulations**: Standard tokamak simulation examples (`CUTE_sim.ipynb`)

## Contributing

This project is part of ongoing plasma disruption research. For contributions or questions, please email nl2951@columbia.edu

## Acknowledgments

Built using the OpenFUSIONToolkit and TokaMaker for Grad-Shafranov equation solving.
Initial AOE Tokamaker and CUTE VDE code was provided by Jamie Xia at the Columbia Plasma Physics Lab. She also mentored Nikas Lukyanov and Matthew Long, the two contributors of this repository.