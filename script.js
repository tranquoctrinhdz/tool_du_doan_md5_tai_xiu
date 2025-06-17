
let lichSu = [];

function duDoan() {
    const md5 = document.getElementById('md5Input').value.trim();
    const von = parseInt(document.getElementById('vonInput').value);
    if (md5.length < 10 || isNaN(von) || von <= 0) {
        alert("Vui lòng nhập đúng mã MD5 và số vốn.");
        return;
    }

    const num = parseInt(md5.replace(/[^0-9]/g, '').slice(0, 8)) || 0;
    const ketQua = num % 2 === 0 ? 'TÀI' : 'XỈU';

    const tyLeTai = ((parseInt(md5[0], 16) % 10) + 50) + "%";
    const tyLeXiu = (100 - parseInt(tyLeTai)) + "%";

    const goiY = Math.round(von * 0.4);

    document.getElementById('ketQua').innerText = "Dự đoán: " + ketQua;
    document.getElementById('goiYCuoc').innerText = "💰 Gợi ý cược: " + goiY.toLocaleString() + " VNĐ";
    document.getElementById('tyLe').innerText = "Tỷ lệ: Tài " + tyLeTai + " / Xỉu " + tyLeXiu;

    // Lưu lịch sử
    lichSu.unshift(md5 + " → " + ketQua);
    if (lichSu.length > 10) lichSu.pop();
    document.getElementById('lichSu').innerHTML = "<h4>Lịch sử:</h4>" + lichSu.map(x => "<div>• " + x + "</div>").join("");

    // Xoá MD5 sau dự đoán
    document.getElementById('md5Input').value = '';
}
