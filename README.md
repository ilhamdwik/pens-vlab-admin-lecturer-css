## Cara run Frontend (Admin-Lecturer)

1.  Install node js
2.  Install yarn
3.  Setup file .env
    | env | deskripsi |
    |------------|----------------|
    | PORT | Port dimana website berjalan |
    | REACT_APP_ENV | Environment development/production (DEV/PROD) |
    | REACT_APP_BACKEND_URL | URL backend server |
4.  Run

```sh
yarn install
yarn global add serve
yarn build
yarn serve -s build -l 3003
```
