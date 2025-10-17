import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState('day1');

  const schedule = {
    day1: [
      { time: "9:00 AM", event: "Registration & Check-in", location: "F Block Badminton Court", type: "registration" },
      { time: "10:00 AM", event: "Opening Cermony Start", location: "Main Auditorium", type: "ceremony" },
      { time: "11:30 AM", event: "Hacking Round 1 Starts", location: "Hacking Area", type: "hack" },
      { time: "1:30 PM", event: "Lunch", location: "Food court", type: "break" },
      { time: "2:30 PM", event: "Hacking Round 2 Start", location: "Hacking Area", type: "hack" },
      { time: "3:30 PM", event: "Mentorship Round 1", location: "Hacking Area", type: "mentoring" },
      { time: "4:30 PM", event: "Refrenshment Break", location: "Food Court", type: "break" },
      { time: "5:30 PM", event: "Hacking Round 3 Start", location: "Hacking Area", type: "hack" },
      { time: "7:00 PM", event: "Dinner break", location: "Food Court", type: "break" },
      { time: "8:00 PM", event: "Activity Time", location: "C Block Ground", type: "break" },
      { time: "9:00 PM", event: "Hacking Round 4", location: "Hacking Area", type: "hack" },
      { time: "11:00 PM", event: "Judgement Round 1", location: "Hacking Area", type: "judging" },
      { time: "12:00 AM", event: "Activity & Games", location: "F Block", type: "break" },
    ],
    day2: [
      { time: "1:30 AM", event: "Hacking Round 5", location: "Hacking Area", type: "hack" },
      { time: "4:00 AM", event: "Mentorship Round 2", location: "F Block", type: "mentorship" },
      { time: "5:00 AM", event: "Hacking Round 6", location: "Hacking Area", type: "hack" },
      { time: "7:00 AM", event: "Judgment Round 2", location: "F Block", type: "judging" },
      { time: "8:00 AM", event: "Breakfast", location: "Food court", type: "break" },
      { time: "9:00 AM", event: "Announcement of Top 15 Teams", location: "Discord Channels/Whatsapp Group", type: "selection" },
      { time: "9:30 AM", event: "Final Presentation", location: "Main Auditorium", type: "presentation" },
      { time: "12:00 PM", event: "Prize Distribution Ceremony", location: "Main Auditorium", type: "ceremony" },
      { time: "12:30 PM", event: "Closing Ceremony & Networking", location: "Main Auditorium", type: "ceremony & networking" },
    ]
  };

  const getEventColor = (type: string) => {
    const colors = {
      registration: "bg-blue-500/20 border-blue-500",
      ceremony: "bg-purple-500/20 border-purple-500",
      networking: "bg-green-500/20 border-green-500",
      hack: "bg-primary/20 border-primary",
      break: "bg-orange-500/20 border-orange-500",
      workshop: "bg-cyan-500/20 border-cyan-500",
      mentoring: "bg-pink-500/20 border-pink-500",
      checkpoint: "bg-yellow-500/20 border-yellow-500",
      deadline: "bg-red-500/20 border-red-500",
      presentation: "bg-indigo-500/20 border-indigo-500"
    };
    return colors[type as keyof typeof colors] || "bg-muted/20 border-muted";
  };

  return (
    <section id="schedule" className="section-spacing bg-muted/5">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            THE EVENT TIMELINE
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            Your quest schedule for the ultimate 24-hour coding adventure. Plan your strategy and make every moment count!
          </p>
        </div>

        {/* Day Toggle */}
        <div className="flex justify-center mb-12">
          <div className="minecraft-card bg-card p-2 flex">
            <Button
              variant={activeDay === 'day1' ? 'default' : 'ghost'}
              onClick={() => setActiveDay('day1')}
              className="minecraft-btn"
            >
              <Calendar className="w-4 h-4 mr-2" />
              DAY 1
            </Button>
            <Button
              variant={activeDay === 'day2' ? 'default' : 'ghost'}
              onClick={() => setActiveDay('day2')}
              className="minecraft-btn"
            >
              <Calendar className="w-4 h-4 mr-2" />
              DAY 2
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {schedule[activeDay as keyof typeof schedule].map((item, index) => (
            <div key={index} className="flex items-start space-x-4 mb-6">
              {/* Time */}
              <div className="flex-shrink-0 w-24">
                <div className="minecraft-card bg-primary/10 border-primary text-center p-2">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <div className="font-pixel text-xs text-primary">
                    {item.time}
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className={`flex-1 minecraft-card ${getEventColor(item.type)} border-2`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-pixel text-sm text-foreground mb-2">
                      {item.event}
                    </h3>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono text-xs">
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-mono border md:block hidden ${getEventColor(item.type)} rounded`}>
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-mono text-sm text-muted-foreground">
            🕐 All times are local. Check our Discord for real-time updates!
          </p>
        </div>
      </div>
    </section>
  );
};