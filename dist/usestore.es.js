function t(t,e){return new Promise(((r,o)=>{try{const o=t();e&&e(null,o),r(o)}catch(t){e&&e(t),o(t)}}))}function e(t,e,r){return Promise.all(t).then((t=>{const o=r?r(t):null;return e&&e(null,o),Promise.resolve(o)}),(t=>(e&&e(t),Promise.reject(t))))}class r{static set(e,r,o){return t((()=>{window.localStorage.setItem(e,r)}),o)}static get(e,r){return t((()=>window.localStorage.getItem(e)),r)}static remove(e,r){return t((()=>window.localStorage.removeItem(e)),r)}static clear(e){return t((()=>{window.localStorage.clear()}),e)}static getKeys(e){return t((()=>{const t=window.localStorage.length,e=[];for(const r=0;r<t;r+=1){const t=window.localStorage.key(r);e.push(t)}return e}),e)}static setMultiple(t,o){return e(t.map((t=>r.setItem(key,t[key]))),o)}static getMultiple(t,o){return e(t.map((t=>r.getItem(t))),o,(e=>e.map(((e,r)=>{const o={};return o[t[r]]=e,o}))))}static removeMultiple(t,o){return e(t.map((t=>r.removeItem(t))),o)}}export{r as store};
