import { createTheme } from "@mui/material";
import { Theme, ThemeOptions } from "@mui/material/styles/createTheme";

let lightOptions: ThemeOptions = {
  palette: {
    // primary:  grey,
    // secondary: lightGreen,
  },
  spacing: 8,
  components: {
    MuiList: {
      defaultProps: {
        dense: true
      }
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      }
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
        padding: "none",
      }
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      }
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      }
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      }
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      }
    },
    MuiPagination: {
      defaultProps: {
        size: "small",
      }
    },
    MuiSelect: {
      defaultProps: {
        size: "small"
      }
    }
  },
};
export const lightTheme: Theme = createTheme(lightOptions);

const darkOptions: ThemeOptions = {...lightOptions, palette: {  mode: 'dark'  }};
export const darkTheme: Theme = createTheme(darkOptions);

const THEME_KEY = "theme-ui-color-mode";

export const getThemeNameStorage = ()=>{
  return localStorage.getItem(THEME_KEY) || "light";
}

export const setThemeNameStorage = (name)=> {
  localStorage.setItem(THEME_KEY, name);
}
