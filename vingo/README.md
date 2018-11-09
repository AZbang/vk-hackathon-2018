# Basic application on React+VKUI for vk apps
Учебный шаблон для написания веб приложения для `vk apps` площадки.

### Фишки
* Готовая структура компонентов
* `React` приложение основанное на `vkui` интерфейсе.
* Использует единственный источник данных `Redux Store`.
* Роутинг `Redux Router` для перехода между панельями приложения.
* Базовые `actions` для работы с `vk api` через `vk-connect`
* Возможность билда на `cordova`

### Использование
`npm i`

`npm run dev`

**Deploy to github-pages**

`npm run deploy`


**Dev for cordova**

`npm run build:cordova`


**Create build.json config for cordova**
```
{
  "android": {
        "release": {
            "keystore": "path/to/key.jks",
            "storePassword": "",
            "alias": "",
            "password" : "",
            "keystoreType": "
        }
    }
}
```
