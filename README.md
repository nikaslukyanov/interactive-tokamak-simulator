# Tokamak Plasma Visualizing Tool Kit

A comprehensive tokamak plasma simulation toolkit built on TokaMaker from the OpenFUSIONToolkit, designed for visualizing of vertical displacement events. 

## Overview

This project provides a complete framework for tokamak plasma simulation, including:
- Plasma equilibrium calculations using the Grad-Shafranov equation
- Vacuum vessel geometry specification and visualization
- Poloidal field coil placement and optimization
- Computational mesh generation with configurable resolution
- Automated timestamped simulation output management

### Prerequisites
- Python 3.x
- OpenFUSIONToolkit
- Standard scientific Python packages

### Setup
1. Install OpenFUSIONToolkit following their documentation (v1.0.0-beta5 version released Jan 23 2025)
2. Clone this repository
3. Ensure OpenFUSIONToolkit is accessible in your Python path

### Basic Simulation
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
- Plasma cross-section visualization
- Vacuum vessel boundary plotting
- Coil location mapping
- Automated figure saving with matplotlib
- Timestamped simulation folders for organized output management

### Customization
- **Mesh Resolution**: Modify resolution parameters for different domains
- **Plasma Shape**: Adjust elongation, triangularity, and boundary points
- **Vacuum Vessel**: Customize (R,Z) coordinates for vessel geometry
- **Coil Configuration**: Specify coil positions and current distributions

### Output Management
The system automatically creates designs and saves them in the testing_1 folder 
- Contains simulation results, plots, and a json configuration file

### Geometric Constraints
- Plasma boundary must fit within vacuum vessel
- Coils must be positioned outside vacuum vessel boundaries
- Automatic validation of geometric relationships

### Computational Mesh
- Structured mesh generation for different domains
- Configurable resolution for optimization vs. accuracy trade-offs
- Support for complex vacuum vessel geometries

### Visualization Tools
- Cross-sectional plasma views
- Magnetic flux surface plotting
- Coil and vessel boundary visualization
- Customizable figure output with automatic saving

## Questions

 For questions, please email nl2951@columbia.edu

## Acknowledgments

Built using the OpenFUSIONToolkit and TokaMaker for Grad-Shafranov equation solving.
Initial AOE Tokamaker and CUTE VDE code was provided by Jamie Xia at the Columbia Plasma Physics Lab. She also mentored Nikas Lukyanov and Matthew Long, the two contributors of this repository. 