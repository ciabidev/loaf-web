/**
 * @deprecated This type is kept for backward compatibility. 
 * Flavor names are now managed by the registry.
 */
export type Flavor = 'manga' | 'rain' | 'desert-oasis' | 'fire-nation' | 'earth' | string;

/**
 * Get flavor descriptions for UI display.
 * Pulls from the Flavor definitions in the registry.
 * @deprecated Import directly from flavor definitions instead
 */
export const flavor_descriptions: Record<string, string> = {};