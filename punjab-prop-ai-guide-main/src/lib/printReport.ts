export function printValuationReport(data: {
  city: string;
  bhk: number;
  area_sqft: number;
  furnishing: string;
  bathroom: number;
  parking: string;
  property_age: number;
  predicted_price: number;
  price_per_sqft: number;
}) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Could not open print window. Please allow popups for this site.");
    return;
  }

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const stampDutyDutyText = "General Punjab Stamp Duty is 7% for male purchasers and 5% for female purchasers, plus a 1% registry fee.";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Valuation Report — ${data.city}</title>
        <style>
          body {
            font-family: 'DM Sans', -apple-system, sans-serif;
            color: #1a2f26;
            margin: 0;
            padding: 40px;
            line-height: 1.6;
          }
          .header {
            border-bottom: 2px solid #bda053;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .title {
            color: #123826;
            margin: 0;
            font-size: 26px;
            font-weight: bold;
          }
          .subtitle {
            color: #718096;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 5px;
          }
          .date {
            font-size: 14px;
            color: #4a5568;
            text-align: right;
          }
          .main-value {
            background-color: #f7fafc;
            border: 1px solid #e2e8f0;
            border-left: 5px solid #bda053;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .main-value h2 {
            margin: 0;
            font-size: 32px;
            color: #bda053;
          }
          .main-value span {
            font-size: 13px;
            color: #718096;
            text-transform: uppercase;
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
          }
          .table-container {
            margin-bottom: 40px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 12px 15px;
            border-bottom: 1px solid #e2e8f0;
            text-align: left;
            font-size: 14px;
          }
          th {
            background-color: #edf2f7;
            color: #4a5568;
            font-weight: bold;
          }
          .guidelines {
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 40px;
            font-size: 13px;
            color: #166534;
          }
          .guidelines h4 {
            margin: 0 0 8px 0;
            font-size: 14px;
            color: #14532d;
          }
          .footer {
            margin-top: 60px;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #718096;
          }
          .sig-box {
            border-top: 1px dashed #cbd5e0;
            width: 200px;
            text-align: center;
            padding-top: 10px;
            margin-top: 40px;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">🏠 Punjab Property AI</div>
            <div class="subtitle">Official Valuation Certificate</div>
          </div>
          <div class="date">
            Date: <strong>${currentDate}</strong><br/>
            Ref: <strong>PAI-${Math.floor(100000 + Math.random() * 900000)}</strong>
          </div>
        </div>

        <div class="main-value">
          <div>
            <span>Estimated Property Value</span>
            <h2>₹ ${data.predicted_price.toFixed(2)} Lakhs</h2>
          </div>
          <div style="text-align: right;">
            <span>Rate Per Sq Ft</span>
            <strong style="font-size: 18px; color: #123826;">₹ ${data.price_per_sqft.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong>
          </div>
        </div>

        <div class="table-container">
          <h3 style="color: #123826; border-left: 3px solid #123826; padding-left: 10px; margin-bottom: 15px;">Property Specifications</h3>
          <table>
            <thead>
              <tr>
                <th style="width: 50%;">Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>City Location</td>
                <td><strong>${data.city}</strong></td>
              </tr>
              <tr>
                <td>BHK Configuration</td>
                <td><strong>${data.bhk} BHK</strong></td>
              </tr>
              <tr>
                <td>Carpet Area (Super Builtup)</td>
                <td><strong>${data.area_sqft} sq ft</strong></td>
              </tr>
              <tr>
                <td>Furnishing Status</td>
                <td style="text-transform: capitalize;"><strong>${data.furnishing}</strong></td>
              </tr>
              <tr>
                <td>Bathrooms</td>
                <td><strong>${data.bathroom}</strong></td>
              </tr>
              <tr>
                <td>Parking Available</td>
                <td><strong>${data.parking}</strong></td>
              </tr>
              <tr>
                <td>Property Age</td>
                <td><strong>${data.property_age} ${data.property_age === 1 ? "year" : "years"}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="guidelines">
          <h4>📌 Punjab Land Registry Guidelines:</h4>
          <p style="margin: 0;">${stampDutyDutyText} Verify the project's RERA registration ID and title search documents prior to initiating transactions.</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div class="footer">
            Generated via Punjab Property AI Prediction Engine.<br/>
            © ${new Date().getFullYear()} Punjab Property AI. All rights reserved.
          </div>
          <div>
            <div class="sig-box">
              Authorized Signature
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
