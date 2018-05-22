/**
 * @class Fetcher
 *
 * Contains helper functions for fetching documents
 */
class Fetcher {

    /**
     * Get a JSON file through a promise
     *
     * @param {string} path
     * @returns {Promise<any>}
     */
    public static async fetchJSONFile(path:string) {
        const response = await fetch(path);
        return await response.json();
    }
}
