import axios from 'axios';

export default ({req})=> {
    if(typeof window ==='undefined'){
        console.log('SSR');
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else{
        console.log('CLient');
        return axios.create({
            baseURL: '/'
        });
    }

}