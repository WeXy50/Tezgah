import sys
import subprocess
import os

def install_and_import(package, import_name):
    try:
        __import__(import_name)
    except ImportError:
        print(f"{package} not found, installing...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

install_and_import('qrcode[pil]', 'qrcode')
import qrcode

base_url = "https://tezgah.test"
branches = ['umraniye', 'samandira', 'sultanbeyli']

for branch in branches:
    url = f"{base_url}/?branch={branch}"
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=15,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#000000", back_color="#ffffff")
    filename = f"qr_{branch}.png"
    img.save(filename)
    print(f"Generated {filename} for {url}")

print("QR kodlar başarıyla oluşturuldu!")
