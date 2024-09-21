/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_OPERATOR_PATH: string
    readonly VITE_BRAND_PATH: string
    readonly VITE_ASSETS_PATH: string
    readonly VITE_CLIENT: string
    readonly VITE_CURRENCY: string
    readonly VITE_BRAND: string
    readonly VITE_BRAND_ID: string
    readonly VITE_BRAND_NAME: string
    readonly VITE_SOURCE_URL: string
    readonly VITE_DEFAULT_LANGUAGE: string
    readonly VITE_AFFILIATE_ID: string
    readonly VITE_BRAND_TITLE: string
    readonly VITE_AGENT_ADMIN_URL: string | null
    readonly VITE_OFFERED_GAME_TYPES: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}