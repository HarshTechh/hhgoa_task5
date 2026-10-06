import { Exercise } from '../types';

export const EXERCISE_DATABASE: Exercise[] = [
  // --- Chest ---
  {
    id: 'ex_bench_press',
    name: 'Barbell Flat Bench Press',
    muscleGroup: 'chest',
    equipment: 'Barbell & Bench',
    instructions: 'Lie on bench, retract scapula, lower bar to mid-chest with control, press upward maintaining elbow tuck.'
  },
  {
    id: 'ex_incline_db_press',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'chest',
    equipment: 'Dumbbells & 30° Bench',
    instructions: 'Set bench to 30-45 degrees. Press dumbbells up over upper chest with full range of motion.'
  },
  {
    id: 'ex_cable_fly',
    name: 'Standing Cable Chest Fly',
    muscleGroup: 'chest',
    equipment: 'Cable Machine',
    instructions: 'Set pulleys at chest height. Squeeze chest across midline with slight elbow bend.'
  },
  {
    id: 'ex_pushups',
    name: 'Bodyweight Push-Ups',
    muscleGroup: 'chest',
    equipment: 'Bodyweight',
    instructions: 'Keep core tight, elbows at 45 degrees, chest nearly touching floor, press up strong.'
  },

  // --- Back ---
  {
    id: 'ex_lat_pulldown',
    name: 'Wide-Grip Lat Pulldown',
    muscleGroup: 'back',
    equipment: 'Cable Machine',
    instructions: 'Grip wide, pull bar down to upper chest while driving elbows down and back.'
  },
  {
    id: 'ex_barbell_row',
    name: 'Bent-Over Barbell Row',
    muscleGroup: 'back',
    equipment: 'Barbell',
    instructions: 'Hinge at hips with flat back. Pull bar towards belly button, squeezing lats.'
  },
  {
    id: 'ex_seated_cable_row',
    name: 'Seated Cable Row',
    muscleGroup: 'back',
    equipment: 'Cable Machine',
    instructions: 'Keep torso upright, pull handle to abdomen, pause and squeeze shoulder blades together.'
  },
  {
    id: 'ex_pullups',
    name: 'Overhand Pull-Ups',
    muscleGroup: 'back',
    equipment: 'Pull-Up Bar',
    instructions: 'Hang with palms facing away. Pull chest up to bar level with strict control.'
  },

  // --- Shoulders ---
  {
    id: 'ex_db_shoulder_press',
    name: 'Seated Dumbbell Shoulder Press',
    muscleGroup: 'shoulders',
    equipment: 'Dumbbells',
    instructions: 'Press dumbbells vertically overhead until arms are extended without locking elbows.'
  },
  {
    id: 'ex_lateral_raise',
    name: 'Dumbbell Lateral Raise',
    muscleGroup: 'shoulders',
    equipment: 'Dumbbells',
    instructions: 'Raise dumbbells laterally to parallel with floor, leading with elbows.'
  },
  {
    id: 'ex_face_pulls',
    name: 'Rope Cable Face Pulls',
    muscleGroup: 'shoulders',
    equipment: 'Cable & Rope',
    instructions: 'Pull rope towards face while externally rotating shoulders to target rear delts.'
  },

  // --- Legs ---
  {
    id: 'ex_barbell_squat',
    name: 'Barbell Back Squat',
    muscleGroup: 'legs',
    equipment: 'Barbell & Squat Rack',
    instructions: 'Bar resting on traps. Break at hips and knees, descend to parallel, drive up through midfoot.'
  },
  {
    id: 'ex_leg_press',
    name: '45-Degree Leg Press',
    muscleGroup: 'legs',
    equipment: 'Leg Press Machine',
    instructions: 'Feet shoulder-width on platform. Lower sled under control until knees reach 90 degrees.'
  },
  {
    id: 'ex_romanian_deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    muscleGroup: 'legs',
    equipment: 'Dumbbells',
    instructions: 'Hinge hips backward with soft knees, feeling deep hamstring stretch before driving hips forward.'
  },
  {
    id: 'ex_walking_lunges',
    name: 'Dumbbell Walking Lunges',
    muscleGroup: 'legs',
    equipment: 'Dumbbells',
    instructions: 'Step forward, lowering back knee towards floor, alternating legs smoothly.'
  },
  {
    id: 'ex_calf_raises',
    name: 'Standing Calf Raise',
    muscleGroup: 'legs',
    equipment: 'Machine / Platform',
    instructions: 'Elevate on balls of feet for maximum contraction, pause, and lower into full stretch.'
  },

  // --- Arms ---
  {
    id: 'ex_bicep_curl',
    name: 'Standing Dumbbell Bicep Curl',
    muscleGroup: 'arms',
    equipment: 'Dumbbells',
    instructions: 'Keep elbows locked at sides. Curl dumbbells up with supination at the top.'
  },
  {
    id: 'ex_tricep_pushdown',
    name: 'Cable Tricep Pushdown',
    muscleGroup: 'arms',
    equipment: 'Cable & Straight/V-Bar',
    instructions: 'Lock elbows by ribs. Push bar downward until arms are fully extended.'
  },
  {
    id: 'ex_hammer_curls',
    name: 'Neutral Grip Hammer Curls',
    muscleGroup: 'arms',
    equipment: 'Dumbbells',
    instructions: 'Maintain neutral palms facing inward to build the brachialis and forearms.'
  },
  {
    id: 'ex_overhead_extension',
    name: 'Dumbbell Overhead Tricep Extension',
    muscleGroup: 'arms',
    equipment: 'Dumbbell',
    instructions: 'Hold dumbbell overhead with both hands, lower behind head to stretch long head of triceps.'
  },

  // --- Core & Cardio ---
  {
    id: 'ex_plank',
    name: 'Forearm Plank Hold',
    muscleGroup: 'core',
    equipment: 'Bodyweight',
    instructions: 'Hold straight line from shoulders to heels, engaging glutes and abdominal wall.'
  },
  {
    id: 'ex_hanging_leg_raise',
    name: 'Hanging Leg / Knee Raise',
    muscleGroup: 'core',
    equipment: 'Pull-Up Bar',
    instructions: 'Hang from bar, contract lower abs to bring knees/toes up toward chest.'
  },
  {
    id: 'ex_treadmill_walk',
    name: 'Incline Treadmill Walk',
    muscleGroup: 'cardio',
    equipment: 'Treadmill',
    instructions: 'Set incline to 10-12% and speed to 4.5-5.5 km/h for steady state fat burn.'
  },
  {
    id: 'ex_outdoor_run',
    name: 'Outdoor Interval Run',
    muscleGroup: 'cardio',
    equipment: 'Running Shoes',
    instructions: 'Alternate between 2-minute tempo pace and 1-minute recovery jog.'
  }
];
