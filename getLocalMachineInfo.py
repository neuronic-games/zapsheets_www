# Importing the library
import os
import psutil
import socket

# Getting loadover15 minutes
# Calling psutil.cpu_precent() for 4 seconds
""" print('The CPU usage is: ', psutil.cpu_percent(1)) """
 
# Getting % usage of virtual_memory ( 3rd field)
#print('RAM memory % used:', psutil.virtual_memory()[2])
# Getting usage of virtual_memory in GB ( 4th field)
""" print('RAM Used (MB):', round(psutil.virtual_memory()[3]/1000000000))


process = psutil.Process(os.getpid())
mem_info = process.memory_info()


print (mem_info)
print ((mem_info.peak_wset)/(1000000)) """

host_name = socket.gethostname()
print (str(round(psutil.virtual_memory()[3]/1000000000)) + ' MB-B-' + host_name)
#print (host_name)