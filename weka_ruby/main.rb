require 'rjb'
#———————-
def kmeans()
	dir = "./weka.jar"

	Rjb::load(dir, jvmargs=["-Xmx1000M"])

	obj = Rjb::import("weka.clusterers.SimpleKMeans")
	kmeans = obj.new

	labor_src = Rjb::import("java.io.FileReader").new("cursos.arff")
	labor_data = Rjb::import("weka.core.Instances").new(labor_src)

	kmeans.buildClusterer(labor_data)
	
	puts kmeans.toString

	points = labor_data.numInstances
	points.times {|instance|
		cluster = kmeans.clusterInstance(labor_data.instance(instance))
		point = labor_data.instance(instance).toString
		puts “#{point} \t #{cluster}”
	}
end

kmeans()