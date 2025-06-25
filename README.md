# AOE TokaMaker - Tokamak Plasma Simulation Toolkit

A comprehensive tokamak plasma simulation toolkit built on TokaMaker from the OpenFUSIONToolkit, designed for Grad-Shafranov equation solving and plasma equilibrium analysis.

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
- Standard scientific Python packages (numpy, matplotlib, etc.)

### Setup
1. Install OpenFUSIONToolkit following their documentation
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
- Major radius: 4.55m
- Minor radius: 1.2m
- Elongation: 1.4
- Triangularity: -0.5
- Configurable isoflux boundary points (30 points default)

### Coil System
- Support for up to 8 poloidal field coils
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
The system automatically creates timestamped folders in `examples/` directory:
- Format: `simulation_YYYYMMDD_HHMMSS/`
- Contains simulation results, plots, and configuration files

## Project Structure

```
tokamak_psp_2025/
├── AOE_tokamaker.ipynb          # Main simulation notebook
├── README.md                    # This file
├── examples/                    # Simulation outputs
│   ├── negative_triangulation_20250624_173927/
│   ├── CUTE_VDE_ex.ipynb
│   └── CUTE_sim.ipynb
└── inspiration_code/            # Reference implementations
    ├── CUTE_VDE_ex.ipynb 19-54-19-544.ipynb
    └── CUTE_sim.ipynb
```

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