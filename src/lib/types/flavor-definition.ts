/**
 * Defines a single flavor (theme) in the application.
 * Developers can register custom flavors that extend this interface.
 */
export interface FlavorDefinition {
	name: string /** Unique identifier for the flavor (also used as display name) */;
	description: string;
	iconPath: string;
	isDark: boolean;
	cssVariables: Record<string, string>;
}
