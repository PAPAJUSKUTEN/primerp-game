import os

def run_vps_site():
    # Pobiera port od Rendera, a jeśli go nie ma (lokalnie), daje 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
