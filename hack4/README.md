# 109-2 NTUEE Web Programming Hackathon 4 - README
# Pandemic Tracking System

## 準備工作
1. 請先按照 preREADME 的指示安裝好本次 Hackathon 所需要使用的 packages。

2. 從 Google Drive 上下載 [`hack4-inclass.zip`](https://drive.google.com/file/d/1UpIlKqdkckgIwYBzooq1DsNEFOJxRlpP/view?usp=sharing) 或 [`hack4-inclass.tgz`](https://drive.google.com/file/d/1G3nF4tR7MkEefnDS230CPmzQZ2VBPunW/view?usp=sharing) (擇一即可)，copy 到 **`/wp1092/hack4/`** 底下解壓縮 (不要在 `wp1902` 下解壓縮哦！)，解壓縮的內容如下，若有重複的檔案一律直接覆蓋。
    ```
    README.md
    backend/cypress/fixtures/people.csv
    backend/cypress/integration/public.spec.js
    backend/src/*
    frontend/src/*
    ```
    > macOS 可能會解壓縮出多一層的資料夾，請將資料夾裡如上頭所列的檔案全部移到 hack4 底下。

3. 請再次檢查一下你的 frontend 以及 backend 底下有沒有 .gitignore, 以及 backend 底下是否有 .babelrc 這個檔案。如果沒有，請再檢查一次壓縮檔，或者是從之前的作業 copy 過來使用。

4. 完整的參考程式之檔案結構如下
    ```
    wp1092/
    ├─── hack4
    |    ├─── .gitignore
    |    ├─── README.md
    |    ├─── frontend
    |    |    ├─── public
    |    |    |    └─── ...
    |    |    ├─── node_modules
    |    |    ├─── package.json
    |    |    ├─── src
    |    |    |    ├─── index.js
    |    |    |    ├─── App.js
    |    |    |    ├─── components
    |    |    |    |    ├─── Uploader.js
    |    |    |    |    ├─── WatchList.js
    |    |    |    |    ├─── ...
    |    |    |    ├─── containers
    |    |    |    |    ├─── Stats.js
    |    |    |    |    ├─── Upload.js
    |    |    |    |    └─── ...
    |    |    |    └─── ...
    |    |    └─── ...
    |    ├─── backend
    |    |    ├─── .babelrc
    |    |    ├─── .gitignore
    |    |    ├─── node_modules
    |    |    ├─── cypress.json
    |    |    ├─── package.json
    |    |    ├─── src
    |    |    |    ├─── db.js
    |    |    |    ├─── data.json
    |    |    |    ├─── invalid-data.json
    |    |    |    ├─── valid-data.json
    |    |    |    ├─── index.js
    |    |    |    └─── ...
    |    |    ├─── cypress
    |    |    |    ├─── integration
    |    |    |    |    └─── public.spec.js
    |    |    |    └─── fixtures
    |    |    |         └─── people.csv
    |    |    └─── ...
    |    └─── ...
    └─── ...
    ```

## 概述
這次黑客松題目是一個簡易的追蹤確診個案的系統。
前端有 "上傳界面" 與 "監控界面" 兩個界面。使用方法可參考 [DEMO 影片](https://youtu.be/Fu-bNFHnWas)。

1. 上傳界面
![](https://i.imgur.com/COVl45U.png)
* 點選 Choose File 按鈕選擇 csv 檔案，選擇檔案後就會**直接上傳**，沒有也不用按任何確認鍵。

![](https://i.imgur.com/UcU3kd9.png)
* 上傳的範例檔案為 `backend/cypress/fixtures/people.csv`，本說明中的示意圖為使用這個檔案的結果。
* **同一個檔案名稱** 選擇第二次 **不會** 觸發上傳。

2. 監控界面: 即時更新各縣市的累計確診數
* 初始畫面：為 `backend/src/valid-data.json` 的內容
![](https://i.imgur.com/iWx5FoI.png)

* 上傳`backend/cypress/fixtures/people.csv`後，數字會即時更新為
![](https://i.imgur.com/kAZzbcz.png)

* 重傳一次 `people.csv`，因為同樣檔名不能上傳，因此畫面不會變

## 注意事項 & 規定
* 提供的檔案裡要寫的地方都有標記 `// TODO`， **不要改到** 提供給你但是沒有 `// TODO` 的檔案。批改的時候不會採用那些檔案。
* 前端大部分的檔案 parsing， UI 都已經寫好了。**不要改到** DOM Structure。
* 前端只需要接上 GraphQL。需要新增程式碼請自行新增在 `frontend/src` 之下按照一般的 naming convention 增加。
* 後端需要從 schema 開始寫到完成 resolver。需要新增程式碼請自行新增在 `backend/src` 之下按照一般的 naming convention 增加。
* 本次 Hackathon 使用 file db, 檔案為 `backend/src/data.json` (後詳述)。
* `valid-data.json` 和 `invalid-data.json` 為供你測試的資料，不用也不應該改到它們。
* 上傳的 csv 檔格式是 UTF8 編碼，如果你用 excel 開起來會是亂碼，建議不要去動它。
* **不能使用 preREADME.md 所規定安裝以外的套件**。
* **必須用 GraphQL 實做**。
* 違反上述兩項規定者，視為作弊。
* 完成後請將 code push 到 github
    ```
    git add hack4
    git commit -m "COMMIT_MESSAGE"
    git push origin master
    ```
### DB
* 後端的 db 是一個 file-system DB，請把它當成普通的 Object 操作。
* 每次操作都會讀取 `backend/src/data.json`，並且把更新後的結果寫回去，這樣寫的目的是為了方便測試。
* 如果在 file db 存取遇到問題，為了測試其他功能，可以把 `backend/src/db.js` 直接改成
    ```javascript
    const fs = require('fs');
    const db = JSON.parse(fs.readFileSync('./src/data.json'));
    module.exports = db;
    ```
    請注意，這樣檔案上傳功能將會失效。
* 一開始提供的檔案 `data.json` 和 `valid-data.json` 是一樣的。這是用來測試正常狀況 (database 正常) 的預設資料，如果需要測試 database 出錯的狀況請用 `invalid-data.json` 覆蓋掉 `data.json`。
* 操作 db 的方法:
    ```javascript
    import db from './db';
    
    // 像 Object 一樣操作它
    const collections = db.people;  // 這是個 Array
    
    // 測試過以下這些操作 其他的不確定可不可以
    console.log(db);
    
    collections[index]
    Object.keys(collections[index])
    collections.filter(...)
    collections.findIndex(...)
    collections.splice(...)
    collections.push(...)
    console.log(collectoins)
    JSON.stringify(collections)
    ```

## 名詞解釋
* ssn: 身份證字號
* severity: 代表健康狀況的 status code，只有以下幾種
    * 0: HEALTHY
    * 1: RAPID_TEST_POSITIVE
    * 2: CPR_TEST_POSITIVE
> 可以用 severity >= 1 判斷確診
* person/people: 一個人叫做 person, 而由 persons 組成的集合 (array) 叫做 people

## Checkpoints
0. Schema (請搭配提供的 json 檔閱讀)
    * Person 
        ```
        ssn
        name
        location {
            name
            description
        }
        severity
        ```
    * 全部都是必須的欄位
    * 型態請自行推斷

1. 參數 (argument) 的規則:
    * 不同 filter argument 的關係是 "and"。
    * 沒有傳入參數代表沒有限制 (i.e. find all)。
    * 沒有寫 optional 的參數代表必須傳入。

首先我們要建立後端 api，請將 port 開在 5000，並用 `backend/src/index.js` 當作 entry point。

2. (20%) Query: `statsCount`
    根據傳入的關鍵字 (locationKeyword) 回傳 match 到 severity 高於參數的人數
    * parameters:
        ```
        severity (optional)
        locationKeywords: [String]
        ```
    * response: [Int]，即對應到每個 locationKeyword 的高於參數的人數，此 array 之長度應和 locationKeywords 相同。
    * behavior:
        * 回傳每個 locationKeyword 包含於 person.location.description （且 person.severity >= severity，如果有傳 severity 參數) 的人數。
        * 請用 String.includes() 判斷字串包含關係。
        * 沒有符合條件則回傳 0
        * catch 到任何錯誤請回傳 null (JS 內建保留字)。
    * 雖然前端之後會固定只有傳 severity = 1，但後端不能寫死，以免影響測試，後果請自負。
    * 確診者如果康復 count 會減少。count 不是累計案例，是目前數量。

3. (20%) Mutation: `insertPeople`
    插入新的資料或是更新欄位
    * parameters:
        ```
        data: [Person]
        ```
    * response: Boolean
    * behavior:
        * 若是 ssn 重複則更新資料，不要有重複的 ssn。
        * insert 失敗 (i.e. catch 到任何的 error) 則 return false，否則 return true (即使沒有任何更新)。

接下來我們要將前面寫的 query/mutation api 接上前端。請先在 `frontend/src/index.js` 設定好 Apollo client。 

4. (20%) 串接前端 - 各縣市統計表
    * 路徑在 `localhost:3000/`，也可以點畫面上方的 "統計表" 按鈕。
    * 請將 `frontend/src/components/WatchList.js` 串接 `statsCount` query。
    * 顯示各縣市確診人數，也就是 severity >= 1 的人數
    * 縣市名稱寫在 `frontend/src/constants.js` 中的 `constants.watchList`。 請當作 `locationKeywords`。
    * 請將回傳結果存在前述 component 的 `counts` 變數。

5. (20%) 串接前端 - 資料上傳界面
    * 路徑在 `localhost:3000/upload`，也可以點畫面上方的 "上傳" 按鈕。
    * 將 mutation function 從 `frontend/src/containers/Upload.js` 的 mutation props 傳入 Uploader。
    * 在 `frontend/src/components/Uploader.js` 呼叫 mutation function。

6. (20%) 使用 subscription 動態更新統計表
    * 請自行設計後端要回傳什麼資料做為參數，後端 api 沒有 spec 也不會測，只會 end-to-end 測試此 subscription 是否能成功運作，要在前端看到正確結果才有分。
    * 不能假設 keyword 的值是固定的。
    * Hint: 不要太在意網路流量問題，用上課教的就能做得出來。
    * WebSocket 在(開發時)後端重啟後會斷線，請重新整理頁面。

## 開啟開發環境 (in ```"hack4"```)
1. 開啟後端
    ```
    (Optional) cd backend/
    yarn server
    ```
    * `localhost:5000/` 會有 graphql-playground 可以測試。
    
2. 開啟前端
    ```
    (optional) cd frontend/
    yarn start
    ```
## 跑測試
1. 開啟前後端 server。
2.  ```
    cd backend
    yarn test
    ```
* 測試會改動到 `backend/src/data.json`，如果要接著手動測請注意。
* 測試時不會每個測資重新啟動後端，如果中間某個測資導致你的 server crash，後面會全錯。
* 如 `preREADME.md` 所說，測試是用 firefox 瀏覽器，electron, chrome, chromium 會有問題。請事先安裝 firefox.
* Ref code 提供的公開測資佔總分的 30%。評分時另有隱藏測資，其測試的功能與公開測資同，但為不同的資料 (所以 code 不要寫死)，佔總分的 70%。


## 其他規定

1. Hackathon 時間為 06/15 (二) 9:10 ~ 12:00，範圍為 GraphQL 的前後端練習
2. 題目請至 Google Drive [`hack4-inclass.zip`](https://drive.google.com/file/d/1In2VLdXG1NZiEVLrD48ZBrKH97oYSlTQ/view?usp=sharing) 或 [`hack4-inclass.tgz`](https://drive.google.com/file/d/1hgG_YFmUNPPQ8aXo16RwrdOqT7d8RfzJ/view?usp=sharing) (擇一即可) 下載， DEMO 影片請至 [YouTube](https://youtu.be/Fu-bNFHnWas) 收看。
3. 同學下載完 ref code 之後請按照 instruction 在 Ceiba [投票區 ([假投票] 其實是 Hack#4 簽到)](https://ceiba.ntu.edu.tw/modules/index.php?csn=9ad2a6&default_fun=vote&current_lang=chinese)，任意選一個選項，作為簽到。請注意，為了避免塞車，大家可以不用急著馬上簽到，最晚在 12:00pm 之前去簽到即可 (但超過 12pm 系統會自動關閉)。
4. 簽出則會以你在 Hackathon 公告之交卷時間之前的 push 的時間為準。
5. 原則上是 honor system, 請大家自愛，hackathon 時不要找別人用任何形式進行討論，違者一經查證屬實，該次 Hackathon 將扣 50% 以上的成績。
6. 也請不要抄襲，我們會在事後跑抓抄襲的程式，一但發現抄襲，除了該次 Hackathon 零分計算之外，也會直接扣學期總分 30 分，情節嚴重者，也會送校方處置。
7. 為了避免因為有人違反上述兩項規定而影響公平性，我們會開放一個 [匿名回報系統](https://docs.google.com/forms/d/e/1FAIpQLSeGzxIbQMf4xHAr9ZkfVwmJJNBfoIU3AWB40podESiwK60Inw/viewform)，如有通報案例，我們必定會進行調查。
8. 當天會在 FB 開啟一個線上提問的 [PO 文]()(連結會在 Hackathon 時提供)，有問題的人請按照說明留下私訊方式，助教會按順序私訊回答。如果沒有使用 FB 的同學，也可以寄 e-mail 問問題，但可能會有一點時間差的問題。
9. 對於一些常見的問題或是關於題目的一些補充與修正，我們會即時整理到 FB 的 [這則公告](https://www.facebook.com/groups/NTURicWebProg/permalink/1414338398914076/)，也會不定時公告到 [Ceiba](https://ceiba.ntu.edu.tw/modules/index.php?csn=9ad2a6&default_fun=bulletin&current_lang=chinese)上，更新時也會寄 e-mail 給大家。

