import { environment } from '../../../environments/environment';
export class DomainUtills {
    baseUrl = new BaseUrl();
    GetDomain(): any {
        return this.baseUrl.ApiUrl + "";
    }
};
export class BaseUrl {
    private applicationUrl: string;
    private apiUrl: string;
    constructor() {
        this.applicationUrl = window.location.origin + "/";
        this.apiUrl = this.getApiUrl();
    }
    get ApplicationUrl() {
        return this.applicationUrl;
    }
get ApiUrl() {
        return this.apiUrl;
    }
    getApiUrl() {
        let originalPath = window.location.origin;
        let domain: string = environment.apiUrl;
        if (originalPath.includes("localhost")) {
            // domain = "http://localhost:3000/";
            // domain = "http://localhost:7001/api/";
            domain = "https://e668-154-192-18-80.ngrok-free.app/api/"; //ngrok

        }
        return domain;
    }
}
