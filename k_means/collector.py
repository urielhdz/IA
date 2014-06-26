class Collector:
	def __init__(self,file_name):
		self.training_table = self.filter_data(self.collect_data(file_name))
		#self.testing_table = self.get_testing_table()
	def collect_data(self,file_name):
		training_table = []
		file = open(file_name,'r')
		for row in file:
			training_table.append(row.strip().split(','))
		return training_table
	def filter_data(self,training_table):
		for i in range(len(training_table)):
			for j in range(len(training_table[i])):
				if j < len(training_table[i]) -1:
					training_table[i][j] = float(training_table[i][j])
				else:
					del training_table[i][j]
		return training_table
	def get_attributes(self,data):
		in_neuron = []
		for j in range(len(data)):
			if j < (len(data) - 1):
				in_neuron.append(data[j])
		return in_neuron
	def get_testing_table(self):
		testing_table = []
		contador = 0
		for i in range(len(self.training_table)):
			if((i > 44 and i < 51) or (i > 95 and i < 100)):
				#testing_table.append(self.training_table.pop(i - contador))
				testing_table.append(self.training_table.pop(i-contador))
				contador += 1
		contador = 0
		return testing_table