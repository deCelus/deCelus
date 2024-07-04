// modelsRouter.js

const express = require('express');
const router = express.Router();

// Simulación de base de datos o modelos disponibles
const modelosPorMarca = {
    Samsung: ['Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21', 'Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy Z Fold 3', 'Galaxy Z Flip 3', 'Galaxy S20 FE', 'Galaxy A72', 'Galaxy A52', 'Galaxy A32', 'Galaxy A12', 'Galaxy M62', 'Galaxy M42', 'Galaxy M32', 'Galaxy XCover 5', 'Galaxy XCover Pro', 'Galaxy XCover FieldPro', 'Galaxy A02s', 'Galaxy A12s', 'Galaxy A32 5G', 'Galaxy A42 5G', 'Galaxy A52 5G', 'Galaxy A72 5G', 'Galaxy M12', 'Galaxy M02s', 'Galaxy M02', 'Galaxy F62', 'Galaxy F52 5G', 'Galaxy F12', 'Galaxy Fold', 'Galaxy Z Fold 2', 'Galaxy Z Flip', 'Galaxy Note 20 Ultra 5G', 'Galaxy Note 10 Lite', 'Galaxy S20 Ultra', 'Galaxy S20+', 'Galaxy S20', 'Galaxy A71', 'Galaxy A51', 'Galaxy A31', 'Galaxy A21s', 'Galaxy A11', 'Galaxy A01', 'Galaxy M31', 'Galaxy M21', 'Galaxy M11', 'Galaxy M01', 'Galaxy M01 Core', 'Galaxy Note 10+ 5G', 'Galaxy Note 10+', 'Galaxy Note 10', 'Galaxy Note 9', 'Galaxy S10 5G', 'Galaxy S10+', 'Galaxy S10', 'Galaxy S10e', 'Galaxy A90 5G', 'Galaxy A80', 'Galaxy A70', 'Galaxy A60', 'Galaxy A50', 'Galaxy A40', 'Galaxy A30', 'Galaxy A20', 'Galaxy A20e', 'Galaxy A10', 'Galaxy A10e', 'Galaxy A10s', 'Galaxy J8', 'Galaxy J6+', 'Galaxy J6', 'Galaxy J4+', 'Galaxy J4', 'Galaxy J3 (2018)', 'Galaxy J2 Core', 'Galaxy J2 Pro (2018)', 'Galaxy J7 Duo', 'Galaxy J7 Prime 2', 'Galaxy J7 Pro', 'Galaxy J7 Prime', 'Galaxy J7 Max', 'Galaxy J7 (2017)', 'Galaxy J7 Neo', 'Galaxy J7 Nxt', 'Galaxy J7 (2016)', 'Galaxy J5 Pro', 'Galaxy J5 Prime', 'Galaxy J5 (2017)', 'Galaxy J5 (2016)', 'Galaxy J4 Core', 'Galaxy J3 Pro', 'Galaxy J3 Prime', 'Galaxy J3 Emerge', 'Galaxy J3 (2017)', 'Galaxy J2 Prime', 'Galaxy J2 Pro', 'Galaxy J2', 'Galaxy J1 Ace Neo', 'Galaxy J1 Mini Prime', 'Galaxy J1 Ace', 'Galaxy J1 (2016)', 'Galaxy J1 Mini', 'Galaxy J', 'Galaxy M', 'Galaxy On', 'Galaxy Tab S7+', 'Galaxy Tab S7', 'Galaxy Tab S6 Lite', 'Galaxy Tab S6', 'Galaxy Tab S5e', 'Galaxy Tab S4', 'Galaxy Tab A7', 'Galaxy Tab A 10.1 (2019)', 'Galaxy Tab A 8.0 (2019)', 'Galaxy Tab A 8.0 (2017)', 'Galaxy Tab A 7.0 (2016)', 'Galaxy Tab Active 3', 'Galaxy Tab Active Pro', 'Galaxy Tab Active 2', 'Galaxy Tab E', 'Galaxy Tab J', 'Galaxy Tab Active', 'Galaxy Watch 4 Classic', 'Galaxy Watch 4', 'Galaxy Watch 3', 'Galaxy Watch Active 2', 'Galaxy Watch Active', 'Galaxy Watch', 'Galaxy Fit 2', 'Galaxy Fit', 'Galaxy Fit e', 'Galaxy Buds Pro', 'Galaxy Buds Live', 'Galaxy Buds+', 'Galaxy Buds', 'Galaxy Buds X', 'Galaxy Buds2', 'Galaxy Gear S3', 'Galaxy Gear Sport', 'Galaxy Gear Fit2 Pro', 'Galaxy Gear Fit2', 'Galaxy Gear Fit'],
    iPhone: ['iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone SE (2020)', 'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11', 'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X', 'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7', 'iPhone SE', 'iPhone 6s Plus', 'iPhone 6s', 'iPhone 6 Plus', 'iPhone 6', 'iPhone 5s', 'iPhone 5c', 'iPhone 5'],
    Motorola: ['Moto G Stylus (2021)', 'Moto G Power (2021)', 'Moto G Play (2021)', 'Moto G100', 'Moto G50', 'Moto G30', 'Moto G10', 'Moto G9 Power', 'Moto G9 Play', 'Moto G8 Power', 'Moto G8 Play', 'Moto G8 Plus', 'Moto G7 Power', 'Moto G7 Play', 'Moto G7 Plus', 'Moto G7', 'Moto G6 Plus', 'Moto G6 Play', 'Moto G6', 'Moto E7', 'Moto E6', 'Moto E6 Plus', 'Moto E5 Plus', 'Moto E5 Play', 'Moto E5', 'Moto E4 Plus', 'Moto E4', 'Moto E3 Power', 'Moto E2', 'Moto E (2020)', 'Moto X Style', 'Moto X Play', 'Moto X Force', 'Moto X Pure Edition', 'Moto X (2nd Gen)', 'Moto X', 'Moto Z4', 'Moto Z3 Play', 'Moto Z2 Play', 'Moto Z Play', 'Moto Z Force', 'Moto Z', 'Moto Z2 Force', 'Moto Z Force Droid', 'Moto Z Droid', 'Moto C', 'Moto C Plus', 'Moto C (2020)', 'Moto One 5G', 'Moto One Action', 'Moto One Fusion', 'Moto One Fusion+', 'Moto One Hyper', 'Moto One Macro', 'Moto One Power', 'Moto One Vision', 'Moto One Zoom', 'Moto One Action', 'Moto One Macro', 'Moto One Power', 'Moto One Vision', 'Moto One Zoom', 'Moto One', 'Moto One P30 Play', 'Moto One P30 Note', 'Moto One P30', 'Moto One P30 Go', 'Moto One P30 Power'],
    Huawei: ['Huawei P50 Pro', 'Huawei P50', 'Huawei Mate 40 Pro', 'Huawei Mate 40', 'Huawei Mate 30 Pro', 'Huawei Mate 30', 'Huawei P40 Pro', 'Huawei P40', 'Huawei P30 Pro', 'Huawei P30', 'Huawei Mate 20 Pro', 'Huawei Mate 20', 'Huawei Mate 10 Pro', 'Huawei Mate 10', 'Huawei P20 Pro', 'Huawei P20', 'Huawei P10 Plus', 'Huawei P10', 'Huawei Nova 7i', 'Huawei Nova 7', 'Huawei Nova 6', 'Huawei Nova 5T', 'Huawei Nova 4', 'Huawei Nova 3i', 'Huawei Y9 Prime 2019', 'Huawei Y9s', 'Huawei Y9 (2019)', 'Huawei Y9 (2018)', 'Huawei Y7 Prime', 'Huawei Y7 (2019)', 'Huawei Y7 (2018)', 'Huawei Y6 (2019)', 'Huawei Y6 (2018)', 'Huawei Y5 (2019)', 'Huawei Y5 (2018)', 'Huawei Enjoy 20 Pro', 'Huawei Enjoy 20 Plus', 'Huawei Enjoy 10e', 'Huawei Enjoy 10s', 'Huawei Enjoy 9e', 'Huawei Enjoy 9s', 'Huawei Enjoy 8e', 'Huawei Enjoy 8s', 'Huawei Enjoy 7s', 'Huawei Mate Xs', 'Huawei Mate X', 'Huawei Mate 20 X', 'Huawei Mate 10 Lite', 'Huawei Mate 9 Pro', 'Huawei P Smart 2021', 'Huawei P Smart 2020', 'Huawei P Smart Z', 'Huawei P Smart+ 2019', 'Huawei P Smart 2019', 'Huawei P Smart (2018)', 'Huawei P9 Plus', 'Huawei P9', 'Huawei MediaPad M6', 'Huawei MediaPad M5', 'Huawei MediaPad T5', 'Huawei MediaPad T3', 'Huawei MediaPad T2', 'Huawei Watch GT 2 Pro', 'Huawei Watch GT 2', 'Huawei Watch GT', 'Huawei Watch Fit', 'Huawei Watch'],
    Xiaomi: ['Xiaomi Mi 11 Ultra', 'Xiaomi Mi 11 Pro', 'Xiaomi Mi 11 Lite', 'Xiaomi Mi 11i', 'Xiaomi Mi 11X Pro', 'Xiaomi Mi 11X', 'Xiaomi Mi 11', 'Xiaomi Mi 10 Ultra', 'Xiaomi Mi 10 Pro', 'Xiaomi Mi 10', 'Xiaomi Mi 10 Lite', 'Xiaomi Mi Note 10 Pro', 'Xiaomi Mi Note 10', 'Xiaomi Mi Note 10 Lite', 'Xiaomi Mi 9', 'Xiaomi Mi 9T Pro', 'Xiaomi Mi 9T', 'Xiaomi Mi 9 Lite', 'Xiaomi Mi 9 SE', 'Xiaomi Mi 8', 'Xiaomi Mi 8 Lite', 'Xiaomi Mi Mix 4', 'Xiaomi Mi Mix 3', 'Xiaomi Mi Mix 2S', 'Xiaomi Mi Mix 2', 'Xiaomi Mi Mix', 'Xiaomi Mi A3', 'Xiaomi Mi A2', 'Xiaomi Mi A2 Lite', 'Xiaomi Mi A1', 'Xiaomi Redmi Note 10 Pro', 'Xiaomi Redmi Note 10', 'Xiaomi Redmi Note 10S', 'Xiaomi Redmi Note 10 5G', 'Xiaomi Redmi Note 9 Pro', 'Xiaomi Redmi Note 9S', 'Xiaomi Redmi Note 9', 'Xiaomi Redmi Note 9T', 'Xiaomi Redmi Note 9 5G', 'Xiaomi Redmi Note 8 Pro', 'Xiaomi Redmi Note 8', 'Xiaomi Redmi Note 7 Pro', 'Xiaomi Redmi Note 7', 'Xiaomi Redmi Note 6 Pro', 'Xiaomi Redmi Note 5 Pro', 'Xiaomi Redmi Note 5', 'Xiaomi Redmi 10', 'Xiaomi Redmi 9T', 'Xiaomi Redmi 9', 'Xiaomi Redmi 9C', 'Xiaomi Redmi 9A', 'Xiaomi Redmi 8A', 'Xiaomi Redmi 8', 'Xiaomi Redmi 8A Dual', 'Xiaomi Redmi 7A', 'Xiaomi Redmi 7', 'Xiaomi Redmi 6A', 'Xiaomi Redmi 6', 'Xiaomi Redmi 5A', 'Xiaomi Redmi 5', 'Xiaomi Redmi 4A', 'Xiaomi Redmi 4', 'Xiaomi Redmi 3S', 'Xiaomi Redmi 3', 'Xiaomi Redmi Go', 'Xiaomi Poco X3 Pro', 'Xiaomi Poco X3 NFC', 'Xiaomi Poco F3', 'Xiaomi Poco F2 Pro', 'Xiaomi Poco X2', 'Xiaomi Poco M3 Pro 5G', 'Xiaomi Poco M3', 'Xiaomi Poco C3', 'Xiaomi Black Shark 4 Pro', 'Xiaomi Black Shark 4', 'Xiaomi Black Shark 3 Pro', 'Xiaomi Black Shark 3', 'Xiaomi Black Shark 2 Pro', 'Xiaomi Black Shark 2', 'Xiaomi Mi Pad 5 Pro', 'Xiaomi Mi Pad 5', 'Xiaomi Mi Pad 4 Plus', 'Xiaomi Mi Pad 4', 'Xiaomi Mi Pad 3', 'Xiaomi Mi Pad 2', 'Xiaomi Mi Band 6', 'Xiaomi Mi Band 5', 'Xiaomi Mi Band 4', 'Xiaomi Mi Band 3', 'Xiaomi Mi Band 2', 'Xiaomi Mi Watch Revolve', 'Xiaomi Mi Watch Lite', 'Xiaomi Mi Watch Color', 'Xiaomi Mi Watch'],
    Sony: ['Sony Xperia 1 III', 'Sony Xperia 5 III', 'Sony Xperia 10 III', 'Sony Xperia 1 II', 'Sony Xperia 5 II', 'Sony Xperia 10 II', 'Sony Xperia 1', 'Sony Xperia 5', 'Sony Xperia 10', 'Sony Xperia XZ3', 'Sony Xperia XZ2 Premium', 'Sony Xperia XZ2', 'Sony Xperia XZ1 Compact', 'Sony Xperia XZ1', 'Sony Xperia XZ Premium', 'Sony Xperia XZs', 'Sony Xperia XZ', 'Sony Xperia X Compact', 'Sony Xperia X Performance', 'Sony Xperia X', 'Sony Xperia Z5 Premium', 'Sony Xperia Z5 Compact', 'Sony Xperia Z5', 'Sony Xperia Z3 Compact', 'Sony Xperia Z3', 'Sony Xperia Z2', 'Sony Xperia Z1 Compact', 'Sony Xperia Z1', 'Sony Xperia Z Ultra', 'Sony Xperia Z'],
    LG: ['LG Velvet', 'LG Wing', 'LG V60 ThinQ', 'LG V50 ThinQ', 'LG G8 ThinQ', 'LG G7 ThinQ', 'LG G6', 'LG G5', 'LG G4', 'LG G3', 'LG G2', 'LG G Flex 2', 'LG G Flex', 'LG Q92', 'LG Q9', 'LG Q8', 'LG Q7', 'LG Q6', 'LG K92', 'LG K62', 'LG K52', 'LG K42', 'LG K40', 'LG K30', 'LG K20', 'LG K10', 'LG K8', 'LG K7', 'LG Stylo 6', 'LG Stylo 5', 'LG Stylo 4', 'LG Stylo 3', 'LG VELVET 5G UW', 'LG VELVET 5G', 'LG V60 ThinQ 5G UW', 'LG V50 ThinQ 5G', 'LG G8X ThinQ', 'LG G8 ThinQ', 'LG G7 ThinQ', 'LG G6', 'LG V40 ThinQ', 'LG V30S ThinQ', 'LG V30+', 'LG V30', 'LG V20', 'LG V10'],
    Nokia: ['Nokia G50', 'Nokia G20', 'Nokia G10', 'Nokia 8.3 5G', 'Nokia 5.4', 'Nokia 3.4', 'Nokia 2.4', 'Nokia 1.4', 'Nokia 9 PureView', 'Nokia 8.3', 'Nokia 8.1', 'Nokia 7.2', 'Nokia 6.2', 'Nokia 5.3', 'Nokia 4.2', 'Nokia 3.2', 'Nokia 2.3', 'Nokia 1.3', 'Nokia 2.2', 'Nokia 3.1 Plus', 'Nokia 5.1 Plus', 'Nokia 6.1 Plus', 'Nokia 7 Plus', 'Nokia 8 Sirocco', 'Nokia 3.1', 'Nokia 5.1', 'Nokia 6.1', 'Nokia 7.1', 'Nokia 2', 'Nokia 3', 'Nokia 5', 'Nokia 6', 'Nokia 7', 'Nokia 8'],
    OnePlus: ['OnePlus 9 Pro', 'OnePlus 9', 'OnePlus 9R', 'OnePlus 8T', 'OnePlus 8 Pro', 'OnePlus 8', 'OnePlus Nord', 'OnePlus 7T Pro', 'OnePlus 7T', 'OnePlus 7 Pro', 'OnePlus 7', 'OnePlus 6T', 'OnePlus 6', 'OnePlus 5T', 'OnePlus 5', 'OnePlus 3T', 'OnePlus 3', 'OnePlus X', 'OnePlus One'],
    GooglePixel: ['Google Pixel 6 Pro', 'Google Pixel 6', 'Google Pixel 5a', 'Google Pixel 5', 'Google Pixel 4a 5G', 'Google Pixel 4a', 'Google Pixel 4 XL', 'Google Pixel 4', 'Google Pixel 3a XL', 'Google Pixel 3a', 'Google Pixel 3 XL', 'Google Pixel 3', 'Google Pixel 2 XL', 'Google Pixel 2', 'Google Pixel XL', 'Google Pixel'],
    ASUS: ['ASUS Zenfone 8 Flip', 'ASUS Zenfone 8', 'ASUS ROG Phone 5 Ultimate', 'ASUS ROG Phone 5 Pro', 'ASUS ROG Phone 5', 'ASUS Zenfone 7 Pro', 'ASUS Zenfone 7', 'ASUS ROG Phone 3', 'ASUS Zenfone 6', 'ASUS Zenfone 5Z', 'ASUS Zenfone Max Pro M2', 'ASUS Zenfone Max Pro M1', 'ASUS Zenfone Max Plus M2', 'ASUS Zenfone Max M2', 'ASUS Zenfone Max M1', 'ASUS Zenfone 4 Pro', 'ASUS Zenfone 4 Selfie Pro', 'ASUS Zenfone 4 Selfie', 'ASUS Zenfone 4 Max', 'ASUS Zenfone 3 Deluxe', 'ASUS Zenfone 3 Zoom', 'ASUS Zenfone 3 Ultra', 'ASUS Zenfone 3 Laser', 'ASUS Zenfone 3 Max', 'ASUS Zenfone 3'],
    HTC: ['HTC Wildfire E2', 'HTC U20 5G', 'HTC Desire 21 Pro 5G', 'HTC Wildfire E3', 'HTC Desire 20 Pro', 'HTC U19e', 'HTC Desire 19+', 'HTC Wildfire X', 'HTC Desire 19s', 'HTC Desire 12s', 'HTC Exodus 1', 'HTC U12 Life', 'HTC U12+', 'HTC U12', 'HTC U11 Life', 'HTC U11+', 'HTC U11', 'HTC U Ultra', 'HTC U Play', 'HTC 10 Evo', 'HTC 10'],
    BlackBerry: ['BlackBerry KEY2 LE', 'BlackBerry KEY2', 'BlackBerry KEYone', 'BlackBerry Motion', 'BlackBerry Aurora', 'BlackBerry DTEK60', 'BlackBerry DTEK50', 'BlackBerry Priv', 'BlackBerry Leap', 'BlackBerry Passport', 'BlackBerry Classic', 'BlackBerry Z30', 'BlackBerry Z10', 'BlackBerry Q10', 'BlackBerry Q5', 'BlackBerry Z3', 'BlackBerry Z30'],
    ZTE: ['ZTE Axon 30 Ultra', 'ZTE Axon 30 Pro', 'ZTE Axon 20 5G', 'ZTE Blade V30', 'ZTE Blade V2020', 'ZTE Blade A7s 2020', 'ZTE Axon 11 SE 5G', 'ZTE Blade V10', 'ZTE Axon 10 Pro', 'ZTE Blade V9 Vita', 'ZTE Blade V9', 'ZTE Blade V8 Pro', 'ZTE Axon 7', 'ZTE Axon 9 Pro', 'ZTE Blade Z Max', 'ZTE Blade X Max', 'ZTE Blade V8', 'ZTE Blade A7 Prime', 'ZTE Blade A7', 'ZTE Blade A6', 'ZTE Blade A3 Prime', 'ZTE Blade A3'],
    Alcatel: ['Alcatel 1S (2021)', 'Alcatel 1SE (2020)', 'Alcatel 3L (2021)', 'Alcatel 3X (2020)', 'Alcatel 1B (2020)', 'Alcatel 1V (2020)', 'Alcatel 3L (2020)', 'Alcatel 1S (2020)', 'Alcatel 3X (2019)', 'Alcatel 3 (2019)', 'Alcatel 1S (2019)', 'Alcatel 3L (2019)', 'Alcatel 1X (2019)', 'Alcatel 1 (2019)', 'Alcatel 3V', 'Alcatel 5V', 'Alcatel 1X', 'Alcatel 3', 'Alcatel 5', 'Alcatel A7 XL', 'Alcatel A7', 'Alcatel A5 LED', 'Alcatel A3 XL', 'Alcatel A3', 'Alcatel U5 HD', 'Alcatel U5'],
    Realme: ['Realme GT 5G', 'Realme GT Neo 2', 'Realme GT Master Edition', 'Realme GT Neo', 'Realme X7 Max 5G', 'Realme X7 Pro 5G', 'Realme X7 5G', 'Realme X50 Pro 5G', 'Realme X50 5G', 'Realme X3 SuperZoom', 'Realme X3', 'Realme X2 Pro', 'Realme X2', 'Realme XT', 'Realme X', 'Realme 8 Pro', 'Realme 8 5G', 'Realme 8', 'Realme 7 Pro', 'Realme 7 5G', 'Realme 7', 'Realme 6 Pro', 'Realme 6', 'Realme 5 Pro', 'Realme 5i', 'Realme 5', 'Realme 3 Pro', 'Realme 3'],
    Lenovo: ['Lenovo Legion Phone Duel 2', 'Lenovo Legion Phone Duel', 'Lenovo K13 Note', 'Lenovo K12 Note', 'Lenovo K12 Pro', 'Lenovo K12', 'Lenovo K11', 'Lenovo K10', 'Lenovo K9 Note', 'Lenovo K9', 'Lenovo K8 Note', 'Lenovo K8 Plus', 'Lenovo K8', 'Lenovo K6 Note', 'Lenovo K6 Power', 'Lenovo K6', 'Lenovo Vibe K5 Plus', 'Lenovo Vibe K5', 'Lenovo Vibe K4 Note', 'Lenovo Vibe K4'],
    OPPO: ['OPPO Find X3 Pro', 'OPPO Find X3 Neo', 'OPPO Find X3 Lite', 'OPPO Find X2 Pro', 'OPPO Find X2', 'OPPO Find X', 'OPPO Reno 6 Pro+', 'OPPO Reno 6 Pro', 'OPPO Reno 6', 'OPPO Reno 5 Pro+', 'OPPO Reno 5 Pro', 'OPPO Reno 5', 'OPPO Reno 4 Pro 5G', 'OPPO Reno 4 Pro', 'OPPO Reno 4', 'OPPO Reno 3 Pro 5G', 'OPPO Reno 3 Pro', 'OPPO Reno 3', 'OPPO A94', 'OPPO A74 5G', 'OPPO A74', 'OPPO A54', 'OPPO A53', 'OPPO A52', 'OPPO A72', 'OPPO A92', 'OPPO A12', 'OPPO F19 Pro+', 'OPPO F19 Pro', 'OPPO F19', 'OPPO F17 Pro', 'OPPO F17', 'OPPO F15', 'OPPO F11 Pro', 'OPPO F11', 'OPPO F9 Pro', 'OPPO F9', 'OPPO F7', 'OPPO F5 Youth', 'OPPO F3', 'OPPO F1s'],
    Vivo: ['Vivo X60 Pro+', 'Vivo X60 Pro', 'Vivo X60', 'Vivo X51 5G', 'Vivo X50 Pro+', 'Vivo X50 Pro', 'Vivo X50', 'Vivo V21 5G', 'Vivo V21e', 'Vivo V21', 'Vivo V20 Pro', 'Vivo V20 SE', 'Vivo V20', 'Vivo V19', 'Vivo V17 Pro', 'Vivo V15 Pro', 'Vivo V15', 'Vivo V11 Pro', 'Vivo V11', 'Vivo V9', 'Vivo V7+', 'Vivo V7', 'Vivo V5 Plus', 'Vivo V5s', 'Vivo V5', 'Vivo Y72 5G', 'Vivo Y52s (t1 Edition)', 'Vivo Y52s', 'Vivo Y51s', 'Vivo Y50', 'Vivo Y20s', 'Vivo Y19', 'Vivo Y15', 'Vivo Y12', 'Vivo Y11', 'Vivo Y91', 'Vivo Y81', 'Vivo Y71', 'Vivo Y69', 'Vivo Y66', 'Vivo Y55s'],
    Meizu: ['Meizu 18s', 'Meizu 18s Pro', 'Meizu 18', 'Meizu 17 Pro', 'Meizu 17', 'Meizu 16s Pro', 'Meizu 16s', 'Meizu 16th', 'Meizu 16X', 'Meizu 15 Plus', 'Meizu 15', 'Meizu 16', 'Meizu 16 Plus', 'Meizu 16Xs', 'Meizu Note 9', 'Meizu Note 8', 'Meizu Note 7', 'Meizu Note 6', 'Meizu Note 5', 'Meizu M10', 'Meizu M9 Note', 'Meizu M8', 'Meizu M6T', 'Meizu M6s', 'Meizu M6 Note', 'Meizu M6'],
    Honor: ['Honor 50 Pro+', 'Honor 50 Pro', 'Honor 50', 'Honor 30 Pro+', 'Honor 30 Pro', 'Honor 30', 'Honor 20 Pro', 'Honor 20', 'Honor 10', 'Honor 9', 'Honor 8', 'Honor View 30 Pro', 'Honor View 30', 'Honor View 20', 'Honor View 10', 'Honor 9X Pro', 'Honor 9X', 'Honor 8X', 'Honor Play', 'Honor Magic 2', 'Honor 10 Lite', 'Honor 9 Lite', 'Honor 8 Lite', 'Honor 7X', 'Honor 6X', 'Honor 5X', 'Honor 4X'],
    Infinix: ['Infinix Note 10 Pro', 'Infinix Note 10', 'Infinix Note 8', 'Infinix Note 7', 'Infinix Note 6', 'Infinix Note 5', 'Infinix Hot 10', 'Infinix Hot 9 Pro', 'Infinix Hot 9', 'Infinix Hot 8', 'Infinix Hot 7 Pro', 'Infinix Smart 5', 'Infinix Smart 4 Plus', 'Infinix Smart 4', 'Infinix Smart 3 Plus', 'Infinix Smart 3', 'Infinix S5 Pro', 'Infinix S5 Lite', 'Infinix S5', 'Infinix S4', 'Infinix S3X', 'Infinix S3'],
    TCL: ['TCL 20 Pro 5G', 'TCL 20L+', 'TCL 20L', 'TCL 20S', 'TCL 10 5G UW', 'TCL 10 5G', 'TCL 10 Pro', 'TCL 10L', 'TCL 10 Plus', 'TCL Plex', 'TCL 10 SE', 'TCL 10 Pro 5G', 'TCL 10 5G UW', 'TCL 10 5G', 'TCL 10 Pro', 'TCL 10L', 'TCL 10 Plus', 'TCL Plex'],
    Sharp: ['Sharp Aquos R6', 'Sharp Aquos R5G', 'Sharp Aquos R3', 'Sharp Aquos S3', 'Sharp Aquos S2', 'Sharp Aquos S3 Mini', 'Sharp Aquos S2 Compact', 'Sharp Aquos C10', 'Sharp Aquos B10', 'Sharp Aquos S3 High Edition', 'Sharp Aquos S3 Mini High Edition', 'Sharp Aquos S3 High Edition', 'Sharp Aquos R Compact', 'Sharp Aquos R2 Compact'],
    Panasonic: ['Panasonic Toughbook FZ-T1', 'Panasonic Toughbook FZ-N1', 'Panasonic Toughbook FZ-T1', 'Panasonic Toughbook FZ-L1', 'Panasonic Toughbook FZ-E1', 'Panasonic Toughbook FZ-X1', 'Panasonic Eluga X1 Pro', 'Panasonic Eluga X1', 'Panasonic Eluga Ray 800', 'Panasonic Eluga Ray 700', 'Panasonic Eluga Ray 600', 'Panasonic Eluga Ray Max', 'Panasonic Eluga Ray', 'Panasonic Eluga I7', 'Panasonic Eluga I5', 'Panasonic Eluga A4', 'Panasonic Eluga A3 Pro', 'Panasonic Eluga A3'],
    LeEco: ['LeEco Le Pro 3 AI Edition', 'LeEco Le Pro 3 Elite', 'LeEco Le Pro 3', 'LeEco Le Max 2', 'LeEco Le Max Pro', 'LeEco Le 2 Pro', 'LeEco Le 2', 'LeEco Le Max', 'LeEco Le 1s', 'LeEco Le 1 Pro', 'LeEco Le 1'],
    Energizer: ['Energizer Power Max P18K Pop', 'Energizer Power Max P600S', 'Energizer Power Max P550S', 'Energizer Power Max P490S', 'Energizer Power Max P600S', 'Energizer Power Max P550S', 'Energizer Power Max P490S'],
    Razer: ['Razer Phone 2', 'Razer Phone'],
    Cat: ['Cat S62 Pro', 'Cat S62', 'Cat S52', 'Cat S48c', 'Cat S41', 'Cat S31', 'Cat S60', 'Cat S40', 'Cat S30'],
    Fairphone: ['Fairphone 4', 'Fairphone 3+'],
    Essential: ['Essential Phone PH-1'],
    Blackview: ['Blackview BV9800 Pro', 'Blackview BV9900 Pro', 'Blackview BV9800', 'Blackview BV9700 Pro', 'Blackview BV9600 Pro', 'Blackview BV9500 Pro', 'Blackview BV9000 Pro', 'Blackview BV8000 Pro', 'Blackview BV7000 Pro', 'Blackview BV6000', 'Blackview BV5900', 'Blackview BV5800 Pro', 'Blackview BV5500 Plus', 'Blackview BV5100', 'Blackview BV4900', 'Blackview BV4800 Pro', 'Blackview BV9700', 'Blackview BV6800 Pro', 'Blackview BV9000', 'Blackview BV6000S', 'Blackview A80 Pro', 'Blackview A70', 'Blackview A60 Pro', 'Blackview A50', 'Blackview A30'],
    Ulefone: ['Ulefone Power Armor 13', 'Ulefone Armor 11 5G', 'Ulefone Armor 10 5G', 'Ulefone Armor 9', 'Ulefone Armor 8', 'Ulefone Armor 7E', 'Ulefone Armor 7', 'Ulefone Armor 6E', 'Ulefone Armor 6', 'Ulefone Armor X8', 'Ulefone Armor X7 Pro', 'Ulefone Armor X7', 'Ulefone Armor X5 Pro', 'Ulefone Armor X5', 'Ulefone Armor 3W', 'Ulefone Armor 3WT', 'Ulefone Armor 3', 'Ulefone Armor 2', 'Ulefone Armor'],
    Wiko: ['Wiko Power U30', 'Wiko Power U20', 'Wiko Power U10', 'Wiko View5', 'Wiko View4 Lite', 'Wiko View4', 'Wiko View3 Pro', 'Wiko View3 Lite', 'Wiko View3', 'Wiko View2 Plus', 'Wiko View2 Go', 'Wiko View2 Pro', 'Wiko View2', 'Wiko View Prime', 'Wiko View Lite', 'Wiko View Max', 'Wiko Y81', 'Wiko Y80', 'Wiko Y70', 'Wiko Y60', 'Wiko Y50', 'Wiko Sunny 4', 'Wiko Sunny 3 Plus', 'Wiko Sunny 3', 'Wiko Sunny 2 Plus', 'Wiko Sunny 2', 'Wiko Sunny']



    // Puedes añadir más marcas y modelos según sea necesario
};

// Ruta para obtener modelos por marca
router.get('/:marca', (req, res) => {
    const { marca } = req.params;
    const modelos = modelosPorMarca[marca] || [];

    res.json(modelos);
});

module.exports = router;
