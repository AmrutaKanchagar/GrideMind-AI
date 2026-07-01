import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export function generatePDF(report) {

    const outputFolder = "./reports";

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    const filename = `Energy_Report_${Date.now()}.pdf`;

    const filePath = path.join(outputFolder, filename);

    const doc = new PDFDocument({
        margin: 40
    });

    doc.pipe(fs.createWriteStream(filePath));

    doc
        .fontSize(24)
        .text("GridMind AI Energy Report", {
            align: "center"
        });

    doc.moveDown();

    doc.fontSize(12);

    doc.text(`Generated: ${new Date().toLocaleString()}`);

    doc.moveDown();

    doc.fontSize(18).text("Executive Summary");

    doc.fontSize(12).text(report.summary || "-");

    doc.moveDown();

    doc.text(`Risk Score : ${report.risk_score}`);

    doc.text(`Risk Level : ${report.risk_level}`);

    doc.text(`Energy Grade : ${report.energy_grade}`);

    doc.moveDown();

    doc.fontSize(18).text("Weather");

    if (report.weather) {

        doc.text(`City : ${report.weather.city}`);

        doc.text(`Temperature : ${report.weather.temperature} °C`);

        doc.text(`Humidity : ${report.weather.humidity}%`);

        doc.text(`Condition : ${report.weather.condition}`);

    }

    doc.moveDown();

    doc.fontSize(18).text("Solar ROI");

    if (report.solar) {

        doc.text(`Recommended : ${report.solar.recommendedKW} KW`);

        doc.text(`Payback : ${report.solar.paybackYears} Years`);

        doc.text(`Lifetime Savings : ₹${report.solar.lifetimeSavings}`);

    }

    doc.moveDown();

    doc.fontSize(18).text("Battery");

    if (report.battery) {

        doc.text(
            `Capacity : ${report.battery.recommendedBatteryKWh} KWh`
        );

        doc.text(
            `Cost : ₹${report.battery.estimatedCost}`
        );

    }

    doc.moveDown();

    doc.fontSize(18).text("Carbon");

    if (report.carbon) {

        doc.text(`Monthly CO₂ : ${report.carbon.monthlyCO2} kg`);

        doc.text(`Trees Needed : ${report.carbon.treesNeeded}`);

    }

    doc.moveDown();

    doc.fontSize(18).text("Recommendations");

    if (report.smartAdvisor) {

        report.smartAdvisor.forEach((item) => {

            doc.text(`• ${item.recommendation}`);

        });

    }

    doc.end();

    return filePath;
}