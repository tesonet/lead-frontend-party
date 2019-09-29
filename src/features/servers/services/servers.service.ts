import { API_URL, LOCAL_STORAGE_TOKEN } from '../../../common/constants/api.config';

export class ServersService {
    public async get(): Promise<any> {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

        return fetch(`${API_URL}servers`, this.setParams(token))
            .then(res => res.json());
    };

    private setParams(token: any) {
        return {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    }
}

