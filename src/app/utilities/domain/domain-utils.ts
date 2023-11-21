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
            domain = environment.apiUrl;
            // domain = "https://84ae-154-192-18-80.ngrok.io/api/"; //ngrok

        }
        return domain;
    }
}
