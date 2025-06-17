let historyData = [];

function predict() {
  const md5 = document.getElementById("md5Input").value.trim();
  if (!md5 || md5.length < 32) return alert("Vui lòng nhập mã MD5 hợp lệ");

  // Dự đoán tài/xỉu: thuật toán đơn giản theo số cuối mã
  let lastChar = md5.slice(-1).toLowerCase();
  let hex = parseInt(lastChar, 16);
  let isTai = hex % 2 === 0;
  let confidence = isTai ? 70 : 30;

  document.getElementById("prediction").innerText = "Dự đoán: " + (isTai ? "TÀI" : "XỈU");
  document.getElementById("confidence").innerText = `Tài: ${isTai ? confidence : 100 - confidence}% | Xỉu: ${isTai ? 100 - confidence : confidence}%`;

  // Lưu lịch sử
  historyData.unshift({
    md5,
    result: isTai ? "TÀI" : "XỈU",
    conf: `${isTai ? confidence : 100 - confidence}%`
  });
  if (historyData.length > 10) historyData.pop();
  renderHistory();

  // Reset mã MD5
  document.getElementById("md5Input").value = "";

  // Gợi ý cược
  let capital = parseInt(document.getElementById("capitalInput").value);
  let suggestion = capital > 0 ? Math.floor(capital * 0.4) : 0;
  document.getElementById("betSuggestion").innerText = `Gợi ý cược: ${suggestion}`;
}

function renderHistory() {
  let html = "";
  historyData.forEach((item, i) => {
    html += `<li>#${i + 1} – ${item.result} (${item.conf})</li>`;
  });
  document.getElementById("history").innerHTML = html;
}