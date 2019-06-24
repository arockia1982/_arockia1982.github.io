define([], function () {
            var mapLocations = init();
            function init() {
                // Setup map locations
                var basemaps = [
                    ["gray", [-100, 45], 3], // World
                    ["streets", [-0.13, 51.50], 11], // London
                    ["hybrid", [151.21, -33.87], 14], // Sydney
                    ["topo", [-77.017, 38.943], 17], // D.C.
                    ["national-geographic", [-84.0, 10], 9], // Costa Rica
                    ["oceans", [-40, 30], 4], // Atlantic
                    ["gray", [135, -25], 4], // Australia
                    ["streets", [-117.20, 32.73], 13], // San Diego
                    ["hybrid", [-77.65, 24.20], 9], // Bahamas
                    ["topo", [139.75, 35.69], 17], // Tokyo
                    ["national-geographic", [-74, 40.74], 12], // New York
                    ["oceans", [-160, 30], 3] // Pacific
                ];
                return basemaps;
            }
            return {
                mapLocations: mapLocations
            }
        });
