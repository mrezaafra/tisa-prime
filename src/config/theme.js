import presetTheme from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

/**
 * Guide: https://primevue.org/theming/styled/
 */

const TisaTheme = definePreset(presetTheme, {
    semantic: {
        // Typography
        typography: {
            fontFamily: "'Vazir', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: {
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem'
            },
            fontWeight: {
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700'
            },
            lineHeight: {
                none: '1',
                tight: '1.25',
                normal: '1.5',
                relaxed: '1.75'
            }
        },

        // Primary Color Palette - Teal
        primary: {
            50: '{teal.50}',
            100: '{teal.100}',
            200: '{teal.200}',
            300: '{teal.300}',
            400: '{teal.400}',
            500: '{teal.500}',
            600: '{teal.600}',
            700: '{teal.700}',
            800: '{teal.800}',
            900: '{teal.900}',
            950: '{teal.950}',
            color: '{primary.500}',
            contrastColor: '{primary.contrast.color}',
            hoverColor: '{primary.600}',
            activeColor: '{primary.700}'
        },

        // Secondary Color Palette
        secondary: {
            50: '{gray.50}',
            100: '{gray.100}',
            200: '{gray.200}',
            300: '{gray.300}',
            400: '{gray.400}',
            500: '{gray.500}',
            600: '{gray.600}',
            700: '{gray.700}',
            800: '{gray.800}',
            900: '{gray.900}',
            950: '{gray.950}',
            color: '{secondary.500}',
            contrastColor: '{secondary.contrast.color}',
            hoverColor: '{secondary.600}',
            activeColor: '{secondary.700}'
        },

        // Success Color Palette
        success: {
            50: '{green.50}',
            100: '{green.100}',
            200: '{green.200}',
            300: '{green.300}',
            400: '{green.400}',
            500: '{green.500}',
            600: '{green.600}',
            700: '{green.700}',
            800: '{green.800}',
            900: '{green.900}',
            950: '{green.950}',
            color: '{success.500}',
            contrastColor: '{success.contrast.color}',
            hoverColor: '{success.600}',
            activeColor: '{success.700}'
        },

        // Info Color Palette
        info: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}',
            color: '{info.500}',
            contrastColor: '{info.contrast.color}',
            hoverColor: '{info.600}',
            activeColor: '{info.700}'
        },

        // Warning Color Palette
        warn: {
            50: '{yellow.50}',
            100: '{yellow.100}',
            200: '{yellow.200}',
            300: '{yellow.300}',
            400: '{yellow.400}',
            500: '{yellow.500}',
            600: '{yellow.600}',
            700: '{yellow.700}',
            800: '{yellow.800}',
            900: '{yellow.900}',
            950: '{yellow.950}',
            color: '{warn.500}',
            contrastColor: '{warn.contrast.color}',
            hoverColor: '{warn.600}',
            activeColor: '{warn.700}'
        },

        // Danger/Error Color Palette
        danger: {
            50: '{red.50}',
            100: '{red.100}',
            200: '{red.200}',
            300: '{red.300}',
            400: '{red.400}',
            500: '{red.500}',
            600: '{red.600}',
            700: '{red.700}',
            800: '{red.800}',
            900: '{red.900}',
            950: '{red.950}',
            color: '{danger.500}',
            contrastColor: '{danger.contrast.color}',
            hoverColor: '{danger.600}',
            activeColor: '{danger.700}'
        },

        // Surface Colors
        surface: {
            0: '{white}',
            50: '{gray.50}',
            100: '{gray.100}',
            200: '{gray.200}',
            300: '{gray.300}',
            400: '{gray.400}',
            500: '{gray.500}',
            600: '{gray.600}',
            700: '{gray.700}',
            800: '{gray.800}',
            900: '{gray.900}',
            950: '{gray.950}'
        },

        // Focus Ring Configuration
        focusRing: {
            width: '2px',
            style: 'dashed',
            color: '{primary.color}',
            offset: '1px',
            shadow: 'none'
        },

        // Border Radius
        borderRadius: {
            none: '0',
            xs: '2px',
            sm: '4px',
            md: '6px',
            lg: '8px',
            xl: '12px'
        },

        // Transition
        transition: {
            duration: '0.3s',
            timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },

        // Spacing
        spacing: {
            0: '0',
            1: '0.25rem',
            2: '0.5rem',
            3: '0.75rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem'
        },

        // Shadows
        shadow: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        },

        // Opacity
        opacity: {
            0: '0',
            25: '0.25',
            50: '0.5',
            75: '0.75',
            100: '1'
        }
    },

    // Component-Specific Customizations -----------------------------------------
    components: {
        // Button Component
        button: {
            root: {
                borderRadius: '{semantic.borderRadius.sm}',
                paddingX: '{semantic.spacing.4}',
                paddingY: '{semantic.spacing.2}',
                fontWeight: '{semantic.typography.fontWeight.medium}',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, color {semantic.transition.duration} {semantic.transition.timing}, border-color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}',
                gap: '{semantic.spacing.2}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            },
            label: {
                fontWeight: '{semantic.typography.fontWeight.medium}'
            },
            icon: {
                size: '1rem'
            }
        },

        // InputText Component
        inputtext: {
            root: {
                background: '{semantic.surface.0}',
                disabledBackground: '{semantic.surface.200}',
                filledBackground: '{semantic.surface.50}',
                filledFocusBackground: '{semantic.surface.0}',
                borderColor: '{semantic.surface.300}',
                hoverBorderColor: '{semantic.primary.color}',
                focusBorderColor: '{semantic.primary.color}',
                invalidBorderColor: '{semantic.danger.color}',
                shadow: '{semantic.shadow.sm}',
                paddingX: '{semantic.spacing.3}',
                paddingY: '{semantic.spacing.2}',
                borderRadius: '{semantic.borderRadius.md}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                },
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, border-color {semantic.transition.duration} {semantic.transition.timing}, color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}, outline-color {semantic.transition.duration} {semantic.transition.timing}'
            }
        },

        // InputNumber Component
        inputnumber: {
            root: {
                background: '{semantic.surface.0}',
                disabledBackground: '{semantic.surface.200}',
                filledBackground: '{semantic.surface.50}',
                filledFocusBackground: '{semantic.surface.0}',
                borderColor: '{semantic.surface.300}',
                hoverBorderColor: '{semantic.primary.color}',
                focusBorderColor: '{semantic.primary.color}',
                invalidBorderColor: '{semantic.danger.color}',
                shadow: '{semantic.shadow.sm}',
                paddingX: '{semantic.spacing.3}',
                paddingY: '{semantic.spacing.2}',
                borderRadius: '{semantic.borderRadius.md}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            },
            buttonGroup: {
                verticalAlign: 'middle'
            },
            stepperButton: {
                background: '{semantic.surface.0}',
                hoverBackground: '{semantic.surface.100}',
                borderColor: '{semantic.surface.300}',
                hoverBorderColor: '{semantic.primary.color}',
                color: '{semantic.surface.700}',
                hoverColor: '{semantic.primary.color}',
                borderRadius: '{semantic.borderRadius.md}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            }
        },

        // Toast Component
        toast: {
            root: {
                background: '{semantic.surface.0}',
                borderColor: '{semantic.surface.200}',
                color: '{semantic.surface.700}',
                shadow: '{semantic.shadow.lg}',
                borderRadius: '{semantic.borderRadius.lg}',
                padding: '{semantic.spacing.4}',
                gap: '{semantic.spacing.3}'
            },
            content: {
                gap: '{semantic.spacing.2}'
            },
            icon: {
                size: '1.5rem'
            },
            message: {
                gap: '{semantic.spacing.2}'
            },
            summary: {
                fontWeight: '{semantic.typography.fontWeight.semibold}'
            },
            detail: {
                color: '{semantic.surface.600}'
            },
            closeButton: {
                hoverBackground: '{semantic.surface.100}',
                activeBackground: '{semantic.surface.200}',
                borderRadius: '{semantic.borderRadius.md}',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}'
            },
            // Severity variants
            success: {
                root: {
                    background: '{semantic.success.color}',
                    borderColor: '{semantic.success.color}',
                    color: '{semantic.success.contrastColor}'
                }
            },
            info: {
                root: {
                    background: '{semantic.info.color}',
                    borderColor: '{semantic.info.color}',
                    color: '{semantic.info.contrastColor}'
                }
            },
            warn: {
                root: {
                    background: '{semantic.warn.color}',
                    borderColor: '{semantic.warn.color}',
                    color: '{semantic.warn.contrastColor}'
                }
            },
            error: {
                root: {
                    background: '{semantic.danger.color}',
                    borderColor: '{semantic.danger.color}',
                    color: '{semantic.danger.contrastColor}'
                }
            }
        },

        // Breadcrumb Component
        breadcrumb: {
            root: {
                background: 'transparent',
                gap: '{semantic.spacing.2}'
            },
            item: {
                gap: '{semantic.spacing.2}',
                borderRadius: '{semantic.borderRadius.md}',
                padding: '{semantic.spacing.1} {semantic.spacing.2}',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}'
            },
            itemLink: {
                color: '{semantic.surface.700}',
                hoverColor: '{semantic.primary.color}',
                borderRadius: '{semantic.borderRadius.md}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                },
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}'
            },
            separator: {
                color: '{semantic.surface.400}'
            }
        },

        // Checkbox Component
        checkbox: {
            root: {
                borderRadius: '{semantic.borderRadius.sm}',
                width: '1.25rem',
                height: '1.25rem',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, border-color {semantic.transition.duration} {semantic.transition.timing}, color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}',
                gap: '{semantic.spacing.2}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            },
            box: {
                background: '{semantic.surface.0}',
                checkedBackground: '{semantic.primary.color}',
                checkedHoverBackground: '{semantic.primary.hoverColor}',
                disabledBackground: '{semantic.surface.200}',
                filledBackground: '{semantic.surface.50}',
                borderColor: '{semantic.surface.300}',
                hoverBorderColor: '{semantic.primary.color}',
                focusBorderColor: '{semantic.primary.color}',
                checkedFocusBorderColor: '{semantic.primary.color}',
                invalidBorderColor: '{semantic.danger.color}',
                shadow: '{semantic.shadow.sm}',
                borderRadius: '{semantic.borderRadius.sm}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            },
            checkIcon: {
                size: '0.875rem',
                color: '{semantic.primary.contrastColor}'
            }
        },

        // AutoComplete Component
        autocomplete: {
            root: {
                background: '{semantic.surface.0}',
                disabledBackground: '{semantic.surface.200}',
                filledBackground: '{semantic.surface.50}',
                filledFocusBackground: '{semantic.surface.0}',
                borderColor: '{semantic.surface.300}',
                hoverBorderColor: '{semantic.primary.color}',
                focusBorderColor: '{semantic.primary.color}',
                invalidBorderColor: '{semantic.danger.color}',
                shadow: '{semantic.shadow.sm}',
                paddingX: '{semantic.spacing.3}',
                paddingY: '{semantic.spacing.2}',
                borderRadius: '{semantic.borderRadius.md}',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, border-color {semantic.transition.duration} {semantic.transition.timing}, color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            },
            list: {
                background: '{semantic.surface.0}',
                borderColor: '{semantic.surface.200}',
                color: '{semantic.surface.700}',
                shadow: '{semantic.shadow.lg}',
                borderRadius: '{semantic.borderRadius.lg}',
                padding: '{semantic.spacing.1}',
                gap: '{semantic.spacing.1}'
            },
            option: {
                focusBackground: '{semantic.surface.100}',
                selectedBackground: '{semantic.primary.color}',
                selectedFocusBackground: '{semantic.primary.hoverColor}',
                padding: '{semantic.spacing.2} {semantic.spacing.3}',
                borderRadius: '{semantic.borderRadius.md}',
                gap: '{semantic.spacing.2}',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}'
            }
        },

        // DatePicker Component
        datepicker: {
            root: {
                background: '{semantic.surface.0}',
                disabledBackground: '{semantic.surface.200}',
                filledBackground: '{semantic.surface.50}',
                filledFocusBackground: '{semantic.surface.0}',
                borderColor: '{semantic.surface.300}',
                hoverBorderColor: '{semantic.primary.color}',
                focusBorderColor: '{semantic.primary.color}',
                invalidBorderColor: '{semantic.danger.color}',
                shadow: '{semantic.shadow.sm}',
                paddingX: '{semantic.spacing.3}',
                paddingY: '{semantic.spacing.2}',
                borderRadius: '{semantic.borderRadius.md}',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, border-color {semantic.transition.duration} {semantic.transition.timing}, color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            },
            panel: {
                background: '{semantic.surface.0}',
                borderColor: '{semantic.surface.200}',
                color: '{semantic.surface.700}',
                shadow: '{semantic.shadow.lg}',
                borderRadius: '{semantic.borderRadius.lg}',
                padding: '{semantic.spacing.2}'
            }
        },

        // CascadeSelect Component
        cascadeselect: {
            root: {
                background: '{semantic.surface.0}',
                disabledBackground: '{semantic.surface.200}',
                filledBackground: '{semantic.surface.50}',
                filledFocusBackground: '{semantic.surface.0}',
                borderColor: '{semantic.surface.300}',
                hoverBorderColor: '{semantic.primary.color}',
                focusBorderColor: '{semantic.primary.color}',
                invalidBorderColor: '{semantic.danger.color}',
                shadow: '{semantic.shadow.sm}',
                paddingX: '{semantic.spacing.3}',
                paddingY: '{semantic.spacing.2}',
                borderRadius: '{semantic.borderRadius.md}',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, border-color {semantic.transition.duration} {semantic.transition.timing}, color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            },
            panel: {
                background: '{semantic.surface.0}',
                borderColor: '{semantic.surface.200}',
                color: '{semantic.surface.700}',
                shadow: '{semantic.shadow.lg}',
                borderRadius: '{semantic.borderRadius.lg}',
                padding: '{semantic.spacing.1}',
                gap: '{semantic.spacing.1}'
            }
        },

        // ColorPicker Component
        colorpicker: {
            root: {
                background: '{semantic.surface.0}',
                disabledBackground: '{semantic.surface.200}',
                filledBackground: '{semantic.surface.50}',
                filledFocusBackground: '{semantic.surface.0}',
                borderColor: '{semantic.surface.300}',
                hoverBorderColor: '{semantic.primary.color}',
                focusBorderColor: '{semantic.primary.color}',
                invalidBorderColor: '{semantic.danger.color}',
                shadow: '{semantic.shadow.sm}',
                paddingX: '{semantic.spacing.3}',
                paddingY: '{semantic.spacing.2}',
                borderRadius: '{semantic.borderRadius.md}',
                transition: 'background-color {semantic.transition.duration} {semantic.transition.timing}, border-color {semantic.transition.duration} {semantic.transition.timing}, color {semantic.transition.duration} {semantic.transition.timing}, box-shadow {semantic.transition.duration} {semantic.transition.timing}',
                focusRing: {
                    width: '{semantic.focusRing.width}',
                    style: '{semantic.focusRing.style}',
                    color: '{semantic.focusRing.color}',
                    offset: '{semantic.focusRing.offset}',
                    shadow: '{semantic.focusRing.shadow}'
                }
            },
            panel: {
                background: '{semantic.surface.0}',
                borderColor: '{semantic.surface.200}',
                color: '{semantic.surface.700}',
                shadow: '{semantic.shadow.lg}',
                borderRadius: '{semantic.borderRadius.lg}',
                padding: '{semantic.spacing.2}'
            }
        }
    }
})

// Export theme with PrimeVue options
export default {
    preset: TisaTheme,
    options: {
        prefix: 'p',
        darkModeSelector: false,
        cssLayer: false
    }
}
