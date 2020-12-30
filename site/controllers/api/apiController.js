const playwright = require('playwright');

let controlador = {

    index: async (req, res) => {
    
    const browser = await playwright.chromium.launch({
        headless: false
    });
    
    const page = await browser.newPage();
    
    await page.goto('http://www.bcra.gov.ar/BCRAyVos/Plazos_fijos_online.asp', { waitUntil: 'domcontentloaded'});
    
    let data = await page.evaluate(() => {
        let rows = document.querySelectorAll('table tr');

        return Array.from(rows, row => {
            const columns = row.querySelectorAll('td');
            return Array.from(columns, column => column.innerText);
        })
    })
    

    await browser.close();  

    return res.status(200).send(
        { data: data }
    );

    }

};

module.exports = controlador;