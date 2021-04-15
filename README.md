# usestore

## 🔧 Install

```
yarn add @apt-exploit/usestore
```

## 💡 Usage

### Import 

```js
import { store } from 'usestore'
```

### Store data

```js
storeData = async () => {
  try {
    await store.set('key', { n: 1 })
  } catch(e) {
    // error
  }
}
```

### Read data

```js
readData = async () => {
  let data

  try {
    data = await store.get('key')
  } catch(e) {
    // error
  }

  console.log(data)
}
```
