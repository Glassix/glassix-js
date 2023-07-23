import axios from "axios";

class GlassixClient {
    constructor(workspace, apiKey, apiSecret, apiVersion, userName, domain) {
        this.workspace = workspace;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.apiVersion = apiVersion ? `v${apiVersion}` : "v1.2";
        this.userName = userName;
        this.domain = domain || "glassix.com";
        const protocol = this.domain.includes("localhost") ? "http" : "https";
        this.url = `${protocol}://${this.workspace}.${this.domain}/api/${this.apiVersion}`;
        this.accessTokenData = {};
        this.tokenExpirationDate = null;
    }

    async getToken(userName) {
        const payload = {
            apiKey: this.apiKey,
            apiSecret: this.apiSecret,
            userName: userName || this.userName,
        };
        const res = await axios.post(`${this.url}/token/get`, payload);
        this.accessTokenData = res?.data;
        this.tokenExpirationDate = new Date(Date.now() + (res?.data?.expires_in * 1000));
        return res?.data;
    }

    static async getRequestHeaders(ctx) {
        const headers = {};
        let token = ctx?.accessTokenData?.access_token;
        if (!token || !ctx.tokenExpirationDate || (ctx.tokenExpirationDate <= Date.now())) {
            const { access_token } = await ctx.getToken();
            token = access_token;
        }
        headers.Authorization = `Bearer ${token}`;
        return headers;
    }

    // TICKETS ENDPOINTS
    static async createTicket(ctx, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/tickets/create`, payload, { headers });
        return res?.data;
    }

    static async getTicket(ctx, ticketId) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/tickets/get/${ticketId}`, { headers });
        return res?.data;
    }

    static async getTicketsList(ctx, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/tickets/list`, { headers, params });
        return res?.data;
    }

    static async sendTicket(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/tickets/send/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async setTicketState(ctx, ticketId, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/tickets/setstate/${ticketId}`, {}, { headers, params });
        return res?.data;
    }

    static async setTicketFields(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/tickets/setfields/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async setTicketParticipantName(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/tickets/setparticipantname/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async setTicketOwner(ctx, ticketId, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/tickets/setowner/${ticketId}`, {}, { headers, params });
        return res?.data;
    }

    static async assignTicketAvailableUser(ctx, ticketId) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/tickets/assignavailableuser/${ticketId}`, {}, { headers });
        return res?.data;
    }

    static async setTicketDepartment(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/tickets/setdepartment/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async addTicketTags(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/tickets/addtags/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async removeTicketTag(ctx, ticketId, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.delete(`${ctx.url}/tickets/removetag/${ticketId}`, { headers, params });
        return res?.data;
    }

    static async addTicketNote(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/tickets/addnote/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async scrambleTicket(ctx, ticketId) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.delete(`${ctx.url}/tickets/scramble/${ticketId}`, { headers });
        return res?.data;
    }

    static async pdfTicket(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/tickets/pdf/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async htmlTicket(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/tickets/html/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async generateTicketSurveyLink(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/tickets/generatesurveylink/${ticketId}`, payload, { headers });
        return res?.data;
    }

    get tickets() {
        const self = this;
        return {
            create: (payload) => GlassixClient.createTicket(self, payload),
            get: (ticketId) => GlassixClient.getTicket(self, ticketId),
            list: (params) => GlassixClient.getTicketsList(self, params),
            send: (ticketId, payload) => GlassixClient.sendTicket(self, ticketId, payload),
            setState: (ticketId, params) => GlassixClient.setTicketState(self, ticketId, params),
            setFields: (ticketId, payload) => GlassixClient.setTicketFields(self, ticketId, payload),
            setParticipantName: (ticketId, payload) => GlassixClient.setTicketParticipantName(self, ticketId, payload),
            setOwner: (ticketId, params) => GlassixClient.setTicketOwner(self, ticketId, params),
            assignAvailableUser: (ticketId) => GlassixClient.assignTicketAvailableUser(self, ticketId),
            setDepartment: (ticketId, payload) => GlassixClient.setTicketDepartment(self, ticketId, payload),
            addTags: (ticketId, payload) => GlassixClient.addTicketTags(self, ticketId, payload),
            removeTag: (ticketId, params) => GlassixClient.removeTicketTag(self, ticketId, params),
            addNote: (ticketId, payload) => GlassixClient.addTicketNote(self, ticketId, payload),
            scramble: (ticketId) => GlassixClient.scrambleTicket(self, ticketId),
            pdf: (ticketId, payload) => GlassixClient.pdfTicket(self, ticketId, payload),
            html: (ticketId, payload) => GlassixClient.htmlTicket(self, ticketId, payload),
            generateSurveyLink: (ticketId, payload) => GlassixClient.generateTicketSurveyLink(self, ticketId, payload),
        };
    }

    // USERS ENDPOINTS
    static async getAllUsers(ctx) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/users/allusers`, { headers });
        return res?.data;
    }

    static async setUserStatus(ctx, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/users/setstatus`, payload, { headers });
        return res?.data;
    }

    static async getUserStatus(ctx) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/users/getstatus`, { headers });
        return res?.data;
    }

    static async addUser(ctx, payload = {}, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/users/add`, payload, { headers, params });
        return res?.data;
    }

    static async deleteUser(ctx, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.delete(`${ctx.url}/users/delete`, { headers, params });
        return res?.data;
    }

    static async setUserUniqueArgument(ctx, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/users/setuniqueargument`, payload, { headers });
        return res?.data;
    }

    static async updateUser(ctx, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/users/update`, payload, { headers });
        return res?.data;
    }

    static async getUserByUniqueArgument(ctx, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/users/getbyuniqueargument`, { headers, params });
        return res?.data;
    }

    static async setUserRoles(ctx, payload = {}, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/users/setroles`, payload, { headers, params });
        return res?.data;
    }

    get users() {
        const self = this;
        return {
            getAll: () => GlassixClient.getAllUsers(self),
            setStatus: (payload) => GlassixClient.setUserStatus(self, payload),
            getStatus: () => GlassixClient.getUserStatus(self),
            add: (payload, params) => GlassixClient.addUser(self, payload, params),
            delete: (params) => GlassixClient.deleteUser(self, params),
            setUniqueArgument: (payload) => GlassixClient.setUserUniqueArgument(self, payload),
            update: (payload) => GlassixClient.updateUser(self, payload),
            getByUniqueArgument: (params) => GlassixClient.getUserByUniqueArgument(self, params),
            setRoles: (payload, params) => GlassixClient.setUserRoles(self, payload, params),
        };
    }

    // TENANTS ENDPOINTS
    static async tenantIsOnline(ctx, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/tenants/isonline`, { headers, params });
        return res?.data;
    }

    static async getTenantTags(ctx) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/tenants/gettags`, { headers });
        return res?.data;
    }

    get tenants() {
        const self = this;
        return {
            isOnline: (params) => GlassixClient.tenantIsOnline(self, params),
            getTags: () => GlassixClient.getTenantTags(self),
        };
    }

    // CONTACTS ENDPOINTS
    static async getContacts(ctx, contactId) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/contacts/get/${contactId}`, { headers });
        return res?.data;
    }

    static async setContactName(ctx, contactId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/contacts/setname/${contactId}`, payload, { headers });
        return res?.data;
    }

    static async addContactIdentifier(ctx, contactId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/contacts/addidentifier/${contactId}`, payload, { headers });
        return res?.data;
    }

    static async setContactUniqueArgument(ctx, contactId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.put(`${ctx.url}/contacts/setuniqueargument/${contactId}`, payload, { headers });
        return res?.data;
    }

    static async deleteContactIdentifier(ctx, contactId, params = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.delete(`${ctx.url}/contacts/deleteidentifier/${contactId}`, { headers, params });
        return res?.data;
    }

    get contacts() {
        const self = this;
        return {
            get: (contactId) => GlassixClient.getContacts(self, contactId),
            setName: (contactId, payload) => GlassixClient.setContactName(self, contactId, payload),
            addIdentifier: (contactId, payload) => GlassixClient.addContactIdentifier(self, contactId, payload),
            setUniqueArgument: (contactId, payload) => GlassixClient.setContactUniqueArgument(self, contactId, payload),
            deleteIdentifier: (contactId, params) => GlassixClient.deleteContactIdentifier(self, contactId, params),
        };
    }

    // CANNED REPLIES ENDPOINTS
    static async getAllCannedReplies(ctx) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.get(`${ctx.url}/cannedreplies/getall`, { headers });
        return res?.data;
    }

    get cannedReplies() {
        const self = this;
        return {
            getAll: () => GlassixClient.getAllCannedReplies(self),
        };
    }

    // INTERACTIVE DOCUMENTS ENDPOINTS
    static async sendInteractiveDocument(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/interactivedocuments/send/${ticketId}`, payload, { headers });
        return res?.data;
    }

    get interactiveDocuments() {
        const self = this;
        return {
            send: (ticketId, payload) => GlassixClient.sendInteractiveDocument(self, ticketId, payload),
        };
    }

    // PROTOCOLS ENDPOINTS
    static async sendProtocol(ctx, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/protocols/send`, payload, { headers });
        return res?.data;
    }

    get protocols() {
        const self = this;
        return {
            send: (payload) => GlassixClient.sendProtocol(self, payload),
        };
    }

    // PHONE CALLS ENDPOINTS
    static async startedPhoneCall(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/phonecalls/started/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async endedPhoneCall(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/phonecalls/ended/${ticketId}`, payload, { headers });
        return res?.data;
    }

    static async audioLinkPhoneCall(ctx, ticketId, payload = {}) {
        const headers = await GlassixClient.getRequestHeaders(ctx);
        const res = await axios.post(`${ctx.url}/phonecalls/audiolink/${ticketId}`, payload, { headers });
        return res?.data;
    }

    get phoneCalls() {
        const self = this;
        return {
            started: (ticketId, payload) => GlassixClient.startedPhoneCall(self, ticketId, payload),
            ended: (ticketId, payload) => GlassixClient.endedPhoneCall(self, ticketId, payload),
            audioLink: (ticketId, payload) => GlassixClient.audioLinkPhoneCall(self, ticketId, payload),
        };
    }
}

export default GlassixClient;