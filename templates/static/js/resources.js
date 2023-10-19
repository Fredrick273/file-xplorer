        // Your existing script code goes here
        const ramTime = [];
        const ramData = [];
        const cpuTime = [];
        const cpuData = [];
        const networkData = [];
        const networkuploadData = [];
        const networkTime = [];
    
        // Create Chart.js instances for RAM and CPU charts
        const ramCtx = document.getElementById("ramChart").getContext('2d');
        ramCtx.canvas.width = 400; 
        ramCtx.canvas.height = 200;
        const ramChart = new Chart(ramCtx, {
            type: 'line',
            data: {
                labels: ramTime,
                datasets: [{
                    label: 'RAM Usage (%)',
                    data: ramData,
                    borderColor: 'blue',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,  
                        max: 100, 
                        title: {
                            display: true,
                            text: 'RAM Usage (%)',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time',
                        }
                    }
                },
            }
        });
        const networkCtx = document.getElementById("networkChart").getContext('2d');
        networkCtx.canvas.width = 400;
        networkCtx.canvas.height = 200;
        const networkChart = new Chart(networkCtx, {
            type: 'line',
            data: {
                labels: networkTime,
                datasets: [{
                    label: 'Netowrk Upload (MB)',
                    data: networkData,
                    borderColor: 'orange',
                    fill: true,
                },
                {
                    label: 'Netowrk Download (MB)',
                    data: networkuploadData,
                    borderColor: 'green',
                    fill: true,
                }
            ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,  
                        title: {
                            display: true,
                            text: 'Network Usage (MB)',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time',
                        }
                    }
                },
            }
        });
    
        const cpuCtx = document.getElementById("cpuChart").getContext('2d');
        cpuCtx.canvas.width = 400;
        cpuCtx.canvas.height = 200;
        const cpuChart = new Chart(cpuCtx, {
            type: 'line',
            data: {
                labels: cpuTime,
                datasets: [{
                    label: 'CPU Usage (%)',
                    data: cpuData,
                    borderColor: 'violet',
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,  
                        max: 100,  
                        title: {
                            display: true,
                            text: 'CPU Usage (%)',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time',
                        }
                    }
                },
            }
        });
    
        // WebSocket connection for resource data
        const resourceSocket = new WebSocket(
            'ws://'
            +
            window.location.host
            +
            "/ws/resource/"
        );
    
        resourceSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            
            if (ramData.length >= 7) {
                ramData.shift();
                ramTime.shift();   
            }
            ramTime.push(new Date().toLocaleTimeString());
            ramData.push(data.ram_usage_percent);
    
            // Add new data to CPU chart
            if (cpuData.length >= 7) {
                cpuData.shift();
                cpuTime.shift();   
            }

            if (networkData.length >= 7) {
                networkData.shift();
                networkuploadData.shift();
                networkTime.shift();   
            }
            cpuTime.push(new Date().toLocaleTimeString());
            cpuData.push(data.cpu_percent);

            networkTime.push(new Date().toLocaleTimeString());
            networkData.push(data.network_bytes_sent);
            networkuploadData.push(data.network_bytes_recv);
            // Update both charts
            ramChart.update();
            cpuChart.update();
            networkChart.update();
    
            // Update OS and other information
            document.getElementById("os-name").textContent = data.os_platform;
            document.getElementById("os-release").textContent = data.os_release;
            document.getElementById("cpu-arch").textContent = data.cpu_architecture;
            document.getElementById("cpu-percent").textContent = data.cpu_percent + "%";
            document.getElementById("cpu-core").textContent = data.cpu_cores;
            document.getElementById("cpu-thread").textContent = data.cpu_threads;
            document.getElementById("ram-percent").textContent = data.ram_usage_percent + "%";
            document.getElementById("ram-usage").textContent = data.ram_usage_gb + " GB";
            document.getElementById("ram-total").textContent = data.ram_total_gb + " GB";
            document.getElementById("ram-avai").textContent = data.ram_available_gb + " GB";
            document.getElementById("disk-usage").textContent = data.disk_usage_percent + "%";
            document.getElementById("disk-total").textContent = data.disk_total_gb + " GB";
            document.getElementById("disk-avai").textContent = data.disk_free_gb + " GB";
            document.getElementById("disk-used").textContent = data.disk_used_gb + " GB";
            document.getElementById("net-sent").textContent = data.network_bytes_sent + " MB";
            document.getElementById("net-recv").textContent = data.network_bytes_recv + " MB";
        };
    
        resourceSocket.onclose = function (e) {
            console.error("Socket closed unexpectedly");
        };
    
        setInterval(function () {
            resourceSocket.send(JSON.stringify({
                'message': "send_data"
            }));
        }, 1000);
