declare enum DisplayType {
    FULLSCREEN = "fullscreen",
    STANDALONE = "standalone",
    MINIMAL_UI = "minimal-ui",
    BROWSER = "browser"
}

declare enum OrientationType {
    ANY = "any",
    NATURAL = "natural",
    LANDSCAPE = "landscape",
    LANDSCAPE_PRIMARY = "landscape-primray",
    LANDSCAPE_SECONDARY = "landscape-secondary",
    PORTRAIT = "portrait",
    PORTRAIT_PRIMARY = "portrait-primary",
    PORTRAIT_SECONDARY = "portrait-secondary"
}

declare interface ManifestIcon {
    src: string,
    type: string,
    sizes: string
}

declare interface ManifestRelatedApp {
    platform: string,
    url: string
}

export interface ManifestOptions {
    short_name?: string,
    name?: string,
    start_url?: string,
    display?: DisplayType,
    background_color?: string,
    description?: string,
    icons?: ManifestIcon[],
    related_applications?: ManifestRelatedApp[],
    orientation?: OrientationType
    scope?: string,
    theme_color?: string
}

export interface PluginOptions {
    input: string,
    minify?: boolean,
    manifest?: ManifestOptions
}