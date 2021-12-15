var Stimulsoft = require('stimulsoft-reports-js');

Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkk0g56JdJtcKNIhdlW4yGGWihgJ0/wwARpH0mEa9fx+/plZs" +
    "Qu8aEHepmv/1vxhv1AfjnxsSCT+AiRii/085ePZTZIEmCnTCd6EbAcmrR3b5reI27qEBbFy4jwNjhPm+ozYRCEIDzP" +
    "8Qc/nWzHvo1fXGrvBMHZUUpeaX+2TmrLCEMGJ6Eg/6EHHBLfEAFx45VXZhDo8rZ10kHG5onncEfhzkgDbzXE429wSP" +
    "6tryjYIwYcnObEnSAQVR9+hKdzKBboBRb25s0Nd/kq6ITaY+SGVL6HzunL/1skN4h0/wqd1E2HrC6yzAzhqCZ3q41E" +
    "2REuIPbJk/LA39v8bfw7nu6NmEqfsGXO4yIZa3KpIGOIHThapW29FKF4XCfHHJqh2NdNPo+pyEj9PyjMVR9572a755" +
    "JwzjgIxI9Rux4BuRQs/gkZjHfm+F05qutoZ2ygoNDkCDkr3OV/96BzBDeXo0p91ZCMHb2Wc6RY4YW98HWWZnnr8z3l" +
    "RXoy/mtXrsXFqd6OrurHrszHIneRgdoGcHLxWZV+CujDdlUH1+fyivziTHykiruFpB256BuJXNfpP8yJlawaOhHj2o" +
    "toylnb2Sbc6vP3h3TPZ7Wl7MbL2Lu4b7LgO9fJzFHcMOz49HqrDp0OxglsiYW+YQI3oP0X2T/cM06pE/p/oyQcS+LY" +
    "S8o1nZXKg53u42Y+7J8daNhUwnfibifJwTs7J1LmsgG5F6TSS67Meb3tURpPvnhHmknhGvSgCk8AgjINT37G5G9yez" +
    "hszt0aMXuyhO+29l5/cThRg3cjmK3dJhRGSldlwxEpoJWvcDOUn7877TIHDRvqZApFTpFp0iWfeAugQOrF7FdyfjwP" +
    "o0PIJB35WLqwikn9pCsFnHVk+a6GnHmpi4M1+6iR6zcNL+BzXJlmmg5sankQvdbIWIZZ+vcw4jTEyOEobPXXXyYcvO" +
    "Jb2pHl3l2W6TR3AvpNsG+8KO2k2vYjGEVpud+Rs4FlNEJB1xZI016mGw==";


Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("public/reports/Arial.ttf", "Arial");
Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile('public/reports/de.xml', true);

let args = process.argv.slice(2),
    dataSource = args[0],
    pdf = args[1],
    report = new Stimulsoft.Report.StiReport(),
    dataSet = new Stimulsoft.System.Data.DataSet('data');


report.loadFile('public/reports/prg/prg_ps_answers.mrt');

dataSet.readJsonFile(dataSource);
report.regData("data", "", dataSet);

report.dictionary.databases.clear();
// report.dictionary.databases.add(database);

report.renderAsync(function () {
    var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf),
        buffer = Buffer.from(data),
        fs = require("fs");

    fs.writeFileSync(pdf, buffer);

    // var settings = new Stimulsoft.Report.Export.StiPdfExportSettings();
    // var service = new Stimulsoft.Report.Export.StiPdfExportService();
    //
    // var stream = new Stimulsoft.System.IO.MemoryStream();
    // service.exportTo(report, stream, settings);
    // var data = stream.toArray();
    // Object.saveAs(data, pdf, "application/pdf");
});