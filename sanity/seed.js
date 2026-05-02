const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

// Data Imports (Local files)
const { projects } = require('../data/projects');
const { education } = require('../data/education');
const { workingExperiences } = require('../data/working-experiences');
const { volunteeringExperiences } = require('../data/volenteering-experience');
const { cpExperiense } = require('../data/cp-experience');
const { workingSkills } = require('../data/working-skills');
const { achivements } = require('../data/achivements');

// Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are required.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-05-01',
});

async function seed() {
  console.log('🚀 Starting seed process...');

  try {
    const transaction = client.transaction();

    // 1. Projects
    projects.forEach((proj, i) => {
      transaction.createOrReplace({
        _id: `project-${i}`,
        _type: 'project',
        title: proj.name,
        slug: { _type: 'slug', current: proj.name.toLowerCase().replace(/\s+/g, '-') },
        description: proj.description,
        abstract: proj.abstract,
        methodology: proj.methodology,
        architecture: proj.architecture,
        status: proj.status,
        runtime: proj.runtime,
        order: i,
        links: {
           github: proj.link,
           deployment: proj.link
        }
      });
    });

    // 2. Education
    education.forEach((edu, i) => {
      transaction.createOrReplace({
        _id: `education-${i}`,
        _type: 'education',
        degree: edu.degree,
        institution: edu.institution,
        period: edu.period,
        cgpa: String(edu.cgpa || edu.gpa),
        focus: edu.focus,
        status: edu.status,
        order: i
      });
    });

    // 3. Experience
    workingExperiences.forEach((exp, i) => {
      transaction.createOrReplace({
        _id: `exp-work-${i}`,
        _type: 'experience',
        company: exp.company,
        role: exp.role,
        duration: exp.duration,
        description: exp.description,
        type: 'work'
      });
    });

    volunteeringExperiences.forEach((exp, i) => {
      transaction.createOrReplace({
        _id: `exp-vol-${i}`,
        _type: 'experience',
        company: exp.company,
        role: exp.role,
        duration: exp.duration,
        description: exp.description,
        type: 'volunteer'
      });
    });

    // 4. CP Experience
    cpExperiense.forEach((cp, i) => {
      transaction.createOrReplace({
        _id: `cp-${i}`,
        _type: 'cpExperience',
        title: cp.title,
        link: cp.link,
        date: cp.date,
        type: cp.type,
        online: !!cp.online,
        maxRating: cp.maxRating,
        handleName: cp.handleName,
        rank: cp.rank,
        teamName: cp.teamName,
        order: i
      });
    });

    // 5. Skills
    workingSkills.forEach((group, i) => {
      transaction.createOrReplace({
        _id: `skill-group-${i}`,
        _type: 'skill',
        section: group.section,
        skills: group.skills.map(s => ({
          _key: Math.random().toString(36).substring(2),
          label: s.label,
          percentage: s.percentage
        }))
      });
    });

    // 6. Achievements
    achivements.forEach((ach, i) => {
      transaction.createOrReplace({
        _id: `achievement-${i}`,
        _type: 'achievement',
        title: ach.title,
        brand: ach.brand,
        brandTextColor: ach.brandTextColor,
        link: ach.link,
        order: i
      });
    });

    // 7. About Profile
    console.log('👤 Processing About Profile...');
    transaction.createOrReplace({
      _id: 'about-me',
      _type: 'about',
      name: 'Hasnat',
      role: 'Software Engineer',
      bio: [
        {
          _key: 'bio-1',
          _type: 'block',
          children: [
            { _key: 'c1', _type: 'span', text: 'CSE student with experience as a ' },
            { _key: 'c2', _type: 'span', text: 'Competitive Programming Instructor', marks: ['important'] },
            { _key: 'c3', _type: 'span', text: ' and ' },
            { _key: 'c4', _type: 'span', text: 'Teaching Assistant', marks: ['important'] },
            { _key: 'c5', _type: 'span', text: '. Passionate about learning new technologies and sharing knowledge. Quick learner and team player seeking a full-time software development position.' }
          ],
          markDefs: [],
          style: 'normal'
        },
        {
          _key: 'bio-2',
          _type: 'block',
          children: [
            { _key: 'c6', _type: 'span', text: 'Participated in prestigious competitive contests like ' },
            { _key: 'c7', _type: 'span', text: 'ICPC Dhaka Regional Final', marks: ['important'] },
            { _key: 'c8', _type: 'span', text: ' for 2 times, ' },
            { _key: 'c9', _type: 'span', text: 'NCPC', marks: ['important'] },
            { _key: 'c10', _type: 'span', text: ', and various ' },
            { _key: 'c11', _type: 'span', text: 'IUPC', marks: ['important'] },
            { _key: 'c12', _type: 'span', text: ' across the country. Experienced in ' },
            { _key: 'c13', _type: 'span', text: 'data structures', marks: ['important'] },
            { _key: 'c14', _type: 'span', text: ', and ' },
            { _key: 'c15', _type: 'span', text: 'algorithms', marks: ['important'] },
            { _key: 'c16', _type: 'span', text: '. Proficient in ' },
            { _key: 'c17', _type: 'span', text: 'JavaScript', marks: ['important'] },
            { _key: 'c18', _type: 'span', text: ', ' },
            { _key: 'c19', _type: 'span', text: 'Python', marks: ['important'] },
            { _key: 'c20', _type: 'span', text: ', and ' },
            { _key: 'c21', _type: 'span', text: 'C++', marks: ['important'] },
            { _key: 'c22', _type: 'span', text: '. Familiar with ' },
            { _key: 'c23', _type: 'span', text: 'React', marks: ['important'] },
            { _key: 'c24', _type: 'span', text: ', ' },
            { _key: 'c25', _type: 'span', text: 'Node.js', marks: ['important'] },
            { _key: 'c26', _type: 'span', text: ', ' },
            { _key: 'c27', _type: 'span', text: 'MySQL', marks: ['important'] },
            { _key: 'c28', _type: 'span', text: ', and ' },
            { _key: 'c29', _type: 'span', text: 'MongoDB', marks: ['important'] },
            { _key: 'c30', _type: 'span', text: '.' }
          ],
          markDefs: [],
          style: 'normal'
        }
      ]
    });

    console.log('⏳ Committing transaction...');
    await transaction.commit();
    console.log('✅ Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

seed();
