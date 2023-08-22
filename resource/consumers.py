import json
import psutil
import time
import platform
from channels.generic.websocket import WebsocketConsumer

class ResourceConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, code):
        pass

    def receive(self, text_data):
        try:
            data = {
                "timestamp": int(time.time()),  # Add a timestamp
                "os_platform": platform.system(),  # Operating system name
                "os_release": platform.release(),  # Operating system release version
                "cpu_architecture": platform.machine(),  # CPU architecture
                'ram_usage_percent':psutil.virtual_memory().percent,
                "ram_usage_gb": psutil.virtual_memory().used / 1e9,  # RAM usage in GB
                "ram_total_gb": psutil.virtual_memory().total / 1e9,  # Total RAM in GB
                "ram_available_gb": psutil.virtual_memory().available / 1e9,  # Available RAM in GB
                "disk_usage_percent": psutil.disk_usage('/').percent,  # Disk usage as a percentage
                "disk_total_gb": psutil.disk_usage('/').total / 1e9,  # Total disk space in GB
                "disk_used_gb": psutil.disk_usage('/').used / 1e9,  # Used disk space in GB
                "disk_free_gb": psutil.disk_usage('/').free / 1e9,  # Free disk space in GB
                "cpu_percent": psutil.cpu_percent(interval=None),  # CPU usage as a percentage
                "cpu_cores": psutil.cpu_count(logical=False),  # Number of physical CPU cores
                "cpu_threads": psutil.cpu_count(logical=True),  # Number of logical CPU threads
                "network_bytes_sent": psutil.net_io_counters().bytes_sent / 1e6,  # Total bytes sent over the network
                "network_bytes_recv": psutil.net_io_counters().bytes_recv / 1e6,  # Total bytes received over the network
            }

            self.send(text_data=json.dumps(data))
        except Exception as e:
            self.send(text_data=json.dumps({"error": str(e)}))
