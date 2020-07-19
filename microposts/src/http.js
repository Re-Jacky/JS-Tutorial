export class EasyHttp {
    async get(url){
        const resp = await fetch(url);
        return await resp.json();
    }

    async post(url,data){
        const resp = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await resp.json();
    }

    async put(url,data){
        const resp = await fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await resp.json();
    }

    async delete(url){
        const resp = await fetch(url,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return 'Resource Deleted...';
    }
}