from collector import Collector
import random
import numpy as np
import math
collector = Collector('iris_real.data')
class Centroid:
	def __init__(self,position,index):
		self.position = position
		self.index = index
		self.points = []
		self.previous_position = []
	def backup_position(self):
		self.previous_position = []
		for i in range(len(self.position)):
			self.previous_position.append(self.position[i])
class Point:
	def __init__(self,position):
		self.centroid = None
		self.position = position
class K:
	def __init__(self,number_of_clusters):
		self.centroids = []
		self.points = []
		for i in range(number_of_clusters):
			ind = int(random.uniform(0,len(collector.training_table)-1))
			centroid = Centroid(collector.training_table[ind],i)
			self.centroids.append(centroid)
		for j in range(len(collector.training_table)):
			
			point = Point(collector.training_table[j])
			self.points.append(point)
	def execute(self):
		self.agregate_points_to_centroids()
		self.move_centroids()
		while self.centroids_moved():			
			self.agregate_points_to_centroids()
			self.move_centroids()
	def agregate_points_to_centroids(self):
		self.restart_centroids()
		for i in range(len(self.points)):
			point = self.points[i]
			shortest_distance = self.calculate_distance(point.position,self.centroids[0].position)
			winner_centroid = self.centroids[0]
			for j in range(len(self.centroids)):
				centroid = self.centroids[j]
				current_distance = self.calculate_distance(point.position,centroid.position)
				if current_distance < shortest_distance:
					shortest_distance = current_distance
					winner_centroid = centroid
			winner_centroid.points.append(point)
			
	def restart_centroids(self):
		for i in range(len(self.centroids)):
			centroid = self.centroids[i]
			centroid.points = []
	def centroids_moved(self):
		
		for i in range(len(self.centroids)):
			centroid = self.centroids[i]			
			if centroid.position != centroid.previous_position:
				
				return True
		return False
	def move_centroids(self):
		for i in range(len(self.centroids)):
			centroid = self.centroids[i]
			centroid.backup_position()
			for j in range(len(centroid.position)):
				my_sum = 0
				for l in range(len(centroid.points)):
					my_sum = my_sum + centroid.points[l].position[j]
				if len(centroid.points) > 0:
					centroid.position[j] = my_sum / len(centroid.points) 
			
	def calculate_distance(self,point_one,point_two):
		my_sum = 0
		for i in range(len(point_one)):
			my_sum = my_sum + ((point_one[i] - point_two[i])**2)
		return math.sqrt(my_sum)
clustering = K(3)
clustering.execute()
suma = 0
for i in range(len(clustering.centroids)):
	centroid = clustering.centroids[i]
	suma += len(centroid.points)
	print len(centroid.points)

