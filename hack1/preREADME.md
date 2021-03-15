# 109-2-Web-Hackathon01 事前準備

1. 同學們寫過作業以後應該已經有 local 端的 repo 了，如果還沒有的話請先在 terminal/cmd 執行以下指令：

    ```console
    $ git clone https://github.com/<USERNAME>/wp1092.git
    ```

2. 請到 ceiba 下載`hack1.tgz`，其內容如下：

   ```console
   hack1
   ├── cypress
   │   └── integration
   │       └── sample.spec.js
   ├── cypress.json
   ├── package.json
   ├── .gitignore
   ├── preREADME.md
   └── sample.html
   ```

3. 將`hack1.tgz`解壓縮到`wp1092`中，此時你的資料夾結構應該如下：

   ```console
   wp1092
   ├── hack1
   │   └── ...
   └── ...
   ```
4. 把檔案推上 GitHub：

   ```console
   $ git add .
   $ git commit -m "Hackathon 1 preparation" # You can modify the commit message
   $ git push
   ```

5. 為了避免網路塞車，請同學們事先用`package.json`載好`node_modules/`，指令如下：

   ```console
   $ cd wp1092/hack1
   $ npm install
   ```

6. 安裝完套件後，可以在終端輸入以下指令測試 Cypress 是否正常運作：

   ```console
   $ npm test
   ```

7. 如果一切運作正常，你應該會看到以下畫面：

    ![image](https://user-images.githubusercontent.com/72388160/110347294-6dfbb300-806b-11eb-82d8-b15f75bf53fb.png)
