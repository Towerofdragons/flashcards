import { BookOpen, Brain, Clock } from "lucide-react";
const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Cards</p>
            <h3 className="text-2xl font-semibold">248</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-accent/10 rounded-lg">
            <Brain className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Mastered</p>
            <h3 className="text-2xl font-semibold">164</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-secondary/50 rounded-lg">
            <Clock className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Study Time</p>
            <h3 className="text-2xl font-semibold">12.4h</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Stats;