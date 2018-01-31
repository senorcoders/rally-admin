import * as axios from 'axios';

//const BASE_URL = 'http://api.provethisconcept.com/objectives';
const BASE_URL = 'http://138.68.19.227:3000';


function upload(formData) {
    const url = `${BASE_URL}`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            image_url, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload }