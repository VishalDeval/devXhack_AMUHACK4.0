
const OpenAI = require("openai");
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Replace with your actual site URL
    "X-Title": "<YOUR_SITE_NAME>", // Replace with your actual site name
  },
});
const healthKeywords = [
  // General Health
  "health", "healthcare", "wellness", "wellbeing", "medicine", "medical", "clinic", "hospital", "doctor", "nurse",
  "physician", "surgeon", "care", "treatment", "diagnosis", "recovery", "illness", "checkup", "appointment", "symptoms",
  "chronic", "acute", "pain", "prevention", "cure", "remedy", "condition", "infection", "consultation", "primary care",

  // Mental Health
  "mental health", "psychology", "psychiatry", "therapist", "psychologist", "psychiatrist", "therapy", "counseling",
  "depression", "anxiety", "bipolar", "OCD", "PTSD", "ADHD", "autism", "neurodivergent", "panic attacks", "mental illness",
  "suicide", "trauma", "grief", "burnout", "stress", "meditation", "mindfulness", "relaxation", "emotional health",
  "self-care", "support group", "resilience", "mood swings",

  // Fitness & Physical Activity
  "fitness", "workout", "exercise", "gym", "training", "cardio", "yoga", "pilates", "running", "jogging", "walking",
  "cycling", "hiking", "HIIT", "stretching", "bodyweight", "calisthenics", "strength", "weightlifting", "resistance",
  "personal trainer", "home workout", "reps", "sets", "active lifestyle", "aerobics", "warmup", "cooldown",

  // Nutrition & Diet
  "nutrition", "diet", "dietitian", "calories", "protein", "carbs", "fats", "macros", "micronutrients", "vitamins",
  "minerals", "hydration", "meal plan", "food pyramid", "superfoods", "balanced diet", "vegan", "vegetarian", "keto",
  "paleo", "gluten free", "sugar free", "intermittent fasting", "weight loss", "weight gain", "supplements", "fiber",
  "cholesterol", "omega 3", "iron", "magnesium", "zinc", "probiotics", "nutritionist", "BMI",

  // Diseases & Disorders
  "diabetes", "hypertension", "asthma", "cancer", "stroke", "heart disease", "arthritis", "obesity", "HIV", "AIDS",
  "hepatitis", "tuberculosis", "migraine", "anemia", "thyroid", "epilepsy", "allergy", "eczema", "psoriasis", "acne",
  "ulcer", "GERD", "PCOS", "endometriosis", "IBS", "MS", "Crohn's", "lupus", "dementia", "Alzheimer's", "Parkinson's",
  "COVID", "flu", "cold", "RSV", "fever", "sinusitis", "UTI", "cyst", "tumor", "infection", "inflammation",

  // Medical Tests & Devices
  "x-ray", "MRI", "CT scan", "ultrasound", "ECG", "EEG", "biopsy", "blood test", "urine test", "stool test",
  "diagnostic", "screening", "monitor", "thermometer", "BP monitor", "glucometer", "insulin", "inhaler", "syringe",
  "ventilator", "pulse oximeter", "stethoscope", "IV", "PPE", "mask", "sanitizer", "defibrillator", "lab result",
  "COVID test", "rapid test", "swab test",

  // Medical Specialties
  "cardiology", "neurology", "dermatology", "oncology", "orthopedics", "pediatrics", "urology", "gynecology",
  "endocrinology", "gastroenterology", "immunology", "nephrology", "rheumatology", "ophthalmology", "ENT",
  "pulmonology", "geriatrics", "radiology", "pathology", "hepatology", "hematology", "toxicology", "allergist",

  // Women's Health & Pregnancy
  "pregnancy", "prenatal", "postnatal", "gynecology", "obstetrics", "labor", "delivery", "contractions", "miscarriage",
  "IVF", "fertility", "menstruation", "period", "cramps", "PMS", "breastfeeding", "contraception", "birth control",
  "c-section", "OB-GYN", "ultrasound", "fetus", "ovulation", "pap smear", "menopause", "HRT", "gestational diabetes",

  // Emergency & First Aid
  "ambulance", "first aid", "trauma", "bleeding", "burn", "fracture", "CPR", "resuscitation", "choking", "drowning",
  "shock", "ER", "urgent care", "bandage", "wound", "sutures", "injury", "poison", "rescue", "accident", "triage",

  // Public Health & Safety
  "pandemic", "epidemic", "vaccine", "immunization", "herd immunity", "sanitation", "outbreak", "quarantine",
  "isolation", "infection control", "public health", "mask mandate", "contact tracing", "symptom checker",

  // Children & Infant Health
  "infant", "newborn", "pediatrician", "immunization schedule", "baby care", "development milestones", "teething",
  "colic", "crib safety", "growth chart", "child nutrition", "vaccines for kids", "breast milk", "formula feeding",

  // Health Data & Insurance
  "EMR", "EHR", "electronic health record", "insurance", "claims", "health plan", "policy", "deductible", "premium",
  "coverage", "benefits", "copay", "authorization", "HIPAA", "medical record", "billing", "authorization",

  // Other Relevant Terms
  "posture", "detox", "holistic", "alternative medicine", "herbal", "natural remedy", "acupuncture", "massage therapy",
  "chiropractor", "homeopathy", "ayurveda", "occupational therapy", "speech therapy", "rehab", "addiction", "sobriety",
  "smoking", "alcohol", "drugs", "fatigue", "insomnia", "sleep hygiene", "sleep apnea", "burnout", "wellness coach"
];

function isHealthRelated(character) {
  const lowerInput = character.toLowerCase();
  return healthKeywords.some(keyword => {
    const lowerKeyword = keyword.toLowerCase();
    const regex = new RegExp(`\\b${lowerKeyword}\\b`, 'i');
    return regex.test(lowerInput);
  });
}

exports.chatbotController = async (req, res) => {
  const { text , age ,gender, weight,height, vegpreference ,healthGoal, allergy,locality} = req.body; 
  if (!isHealthRelated(text)) {
     const val=["Only health-related questions are allowed. Please rephrase your query."]
      return res.status(200).json(val)
    
  }
  if(age|| gender|| weight||height){
    var newText= text  +" my age = "+ age+"  gender is "+gender+"  weight is "+ weight +"  height is "+ height+"  Veg Preference is "+ vegpreference+"  Health Goal is "+ healthGoal+"  allergy is " +allergy+"  locality is "+locality 
  }
  else{
    var newText= text 
  }
  console.log("Request received:", newText);
  
  try {
    const response = await openai.chat.completions.create({
      model:"deepseek/deepseek-r1:free",
      messages: [
        {
          "role": "user",
          "content": newText
        }
      ],
    });
  
    console.log("Response received:", response);
    
    const resp = response.choices[0].message.content;
    let ans = resp.split("-").map(ans => ans.trim()).filter(ans => ans); 
    console.log("Here is reply -", ans);
    

    return res.status(200).json(ans);
    
   
  } catch (error) {
    console.error("Detailed error:", error);
    console.error("Response data:", error.response?.data);
    console.error("Error message:", error.message);
    
    return res.status(500).json({
      message: error.message,
    });
  }
};
