async function searchNumber() {
    const number = document.getElementById('number').value;
    const resultDiv = document.getElementById('result');
    
    // نمبر کی تصدیق
    if (!number || !number.startsWith('03') || number.length !== 11) {
        resultDiv.innerHTML = '<div class="error">براہ کرم صحیح نمبر درج کریں (03xxxxxxxxx)</div>';
        return;
    }

    // لوڈنگ میسج
    resultDiv.innerHTML = '<div style="text-align:center;"><span class="loading"></span> ڈیٹا لوڈ ہو رہا ہے...</div>';

    try {
        // API کال
        const response = await fetch('https://minahilsimdata.info/search.php', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `number=${number}`
        });
        
        const data = await response.json();
        
        // نتائج دکھائیں
        if (data.error) {
            resultDiv.innerHTML = `<div class="error">${data.error}</div>`;
        } else {
            resultDiv.innerHTML = `
                <h3>نتیجہ برائے: ${number}</h3>
                <p><strong>نیٹ ورک:</strong> ${data.network || 'معلوم نہیں'}</p>
                <p><strong>مقام:</strong> ${data.details || 'دستیاب نہیں'}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">سرور سے رابطہ نہیں ہو سکا۔ بعد میں کوشش کریں۔</div>';
    }
}
