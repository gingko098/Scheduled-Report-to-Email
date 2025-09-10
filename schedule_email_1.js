/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/search', 'N/email', 'N/file', 'N/runtime'], (search, email, file, runtime) => {

    const execute = (context) => {
        try {
            // Mengambil alamat email penerima dari parameter skrip
            // Pastikan Anda membuat parameter skrip dengan ID: 'custscript_report_recipients'
            let recipientsParam = runtime.getCurrentScript().getPreference({
                name: 'custscript_report_recipients'
            });

            // Mengubah string email menjadi array
            let recipients = recipientsParam ? recipientsParam.split(',') : [];
            
            // Cek apakah ada penerima yang valid
            if (recipients.length === 0) {
                log.audit('Scheduled Report', 'No recipients specified. Script aborted.');
                return;
            }

            // 1. Load Saved Search
            let mySearch = search.load({
                id: 'customsearch_ar_aging' // Ganti dengan ID saved search kamu
            });

            let csvContent = 'Customer,Amount\n';
            
            // 2. Run search & generate CSV content
            mySearch.run().each(result => {
                let customer = result.getText({ name: 'entity' }) || '';
                let amount = result.getValue({ name: 'amountremaining' }) || 0;
                csvContent += `${customer},${amount}\n`;
                return true;
            });

            // 3. Buat file CSV
            let csvFile = file.create({
                name: 'AR_Aging_Report.csv',
                fileType: file.Type.CSV,
                contents: csvContent
            });

            // 4. Kirim via Email
            email.send({
                author: -5, // -5 = default employee (System)
                recipients: recipients, // Menggunakan array penerima yang dinamis
                subject: 'Weekly AR Aging Report',
                body: 'Hi Team, terlampir laporan AR Aging mingguan.',
                attachments: [csvFile]
            });

            log.audit('Scheduled Report', 'Email sent successfully to: ' + recipients.join(', '));

        } catch (e) {
            log.error('Error Scheduled Report', e.toString());
        }
    };

    return { execute };
});