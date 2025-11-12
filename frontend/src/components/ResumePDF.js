import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// Dynamic styles per template
const getTheme = (templateId) => {
  switch (templateId) {
    case 'classic':
      return {
        pageBg: '#FFFFFF',
        text: '#1f2937',
        subtle: '#6b7280',
        primary: '#111827',
        link: '#1d4ed8',
        chipBg: '#f3f4f6',
        headerBorder: '#111827',
      };
    case 'minimalist':
      return {
        pageBg: '#FFFFFF',
        text: '#111827',
        subtle: '#6b7280',
        primary: '#374151',
        link: '#2563eb',
        chipBg: '#f3f4f6',
        headerBorder: '#e5e7eb',
      };
    case 'elegant':
      return {
        pageBg: '#FFFFFF',
        text: '#111827',
        subtle: '#6b7280',
        primary: '#6d28d9',
        link: '#6d28d9',
        chipBg: '#ede9fe',
        headerBorder: '#6d28d9',
      };
    case 'creative':
      return {
        pageBg: '#FFFFFF',
        text: '#111827',
        subtle: '#6b7280',
        primary: '#f97316',
        link: '#f97316',
        chipBg: '#fff7ed',
        headerBorder: '#f97316',
      };
    case 'bold':
      return {
        pageBg: '#111827',
        text: '#FFFFFF',
        subtle: '#d1d5db',
        primary: '#f59e0b',
        link: '#f59e0b',
        chipBg: '#1f2937',
        headerBorder: '#f59e0b',
      };
    case 'modern':
    default:
      return {
        pageBg: '#FFFFFF',
        text: '#1f2937',
        subtle: '#6b7280',
        primary: '#2563eb',
        link: '#2563eb',
        chipBg: '#f3f4f6',
        headerBorder: '#2563eb',
      };
  }
};

const createStyles = (theme) => StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: theme.pageBg,
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: `2 solid ${theme.headerBorder}`,
    paddingBottom: 12,
  },
  // Used for templates that show a colored card in the header (e.g., Bold/Creative)
  headerCard: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerCenter: {
    alignItems: 'center',
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 8,
  },
  contact: {
    fontSize: 10,
    color: theme.text,
    marginBottom: 6,
  },
  contactLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 0,
  },
  icon: {
    fontSize: 10,
    marginRight: 6,
    color: theme.primary,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  contactText: {
    fontSize: 10,
    color: theme.text,
  },
  linkText: {
    fontSize: 10,
    color: theme.link,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 8,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: theme.primary,
    marginTop: -6,
    marginBottom: 8,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.text,
  },
  company: {
    fontSize: 11,
    color: theme.subtle,
    marginBottom: 4,
  },
  dates: {
    fontSize: 10,
    color: theme.subtle,
  },
  description: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'justify',
    color: theme.text,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.text,
  },
  institution: {
    fontSize: 11,
    color: theme.subtle,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: theme.chipBg,
    padding: '4 8',
    margin: '2 4 2 0',
    borderRadius: 4,
    fontSize: 10,
    color: theme.text,
  },
  summary: {
    fontSize: 11,
    textAlign: 'justify',
    lineHeight: 1.6,
    color: theme.text,
  }
});

const ResumePDF = ({ resumeData, templateId = 'modern' }) => {
  const theme = getTheme(templateId);
  const styles = createStyles(theme);
  const {
    personalInfo = {},
    summary = '',
    education = [],
    experience = [],
    skills = [],
    projects = []
  } = resumeData;

  const isBoldLike = templateId === 'bold' || templateId === 'creative';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, isBoldLike && styles.headerCenter]}>
          {isBoldLike ? (
            <View style={[styles.headerCard, styles.headerCenter]}>
              <Text style={[styles.name, { color: '#FFFFFF' }]}>
                {personalInfo.fullName || 'Your Name'}
              </Text>
              <View style={[styles.contact, styles.headerCenter]}> 
                <View style={styles.contactLine}>
                  {personalInfo.email && (
                    <View style={styles.contactRow}>
                      <Text style={[styles.icon, { color: '#FFFFFF' }]}>✉</Text>
                      <Text style={[styles.contactText, { color: '#FFFFFF' }]}>{personalInfo.email}</Text>
                    </View>
                  )}
                  {personalInfo.phone && (
                    <View style={styles.contactRow}>
                      <Text style={[styles.icon, { color: '#FFFFFF' }]}>☎</Text>
                      <Text style={[styles.contactText, { color: '#FFFFFF' }]}>{personalInfo.phone}</Text>
                    </View>
                  )}
                  {personalInfo.address && (
                    <View style={styles.contactRow}>
                      <Text style={[styles.icon, { color: '#FFFFFF' }]}>📍</Text>
                      <Text style={[styles.contactText, { color: '#FFFFFF' }]}>{personalInfo.address}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.contactLine}>
                  {personalInfo.linkedin && (
                    <View style={styles.contactRow}>
                      <Text style={[styles.icon, { color: '#FFFFFF' }]}>🔗</Text>
                      <Link src={personalInfo.linkedin} style={[styles.linkText, { color: '#FFFFFF' }]}>LINKEDIN</Link>
                    </View>
                  )}
                  {personalInfo.website && (
                    <View style={styles.contactRow}>
                      <Text style={[styles.icon, { color: '#FFFFFF' }]}>🌐</Text>
                      <Link src={personalInfo.website} style={[styles.linkText, { color: '#FFFFFF' }]}>PORTFOLIO</Link>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.name}>
                {personalInfo.fullName || 'Your Name'}
              </Text>
              <View style={styles.contact}>
                <View style={styles.contactLine}>
                  {personalInfo.email && (
                    <View style={styles.contactRow}>
                      <Text style={styles.icon}>✉</Text>
                      <Text style={styles.contactText}>{personalInfo.email}</Text>
                    </View>
                  )}
                  {personalInfo.phone && (
                    <View style={styles.contactRow}>
                      <Text style={styles.icon}>☎</Text>
                      <Text style={styles.contactText}>{personalInfo.phone}</Text>
                    </View>
                  )}
                  {personalInfo.address && (
                    <View style={styles.contactRow}>
                      <Text style={styles.icon}>📍</Text>
                      <Text style={styles.contactText}>{personalInfo.address}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.contactLine}>
                  {personalInfo.linkedin && (
                    <View style={styles.contactRow}>
                      <Text style={styles.icon}>🔗</Text>
                      <Link src={personalInfo.linkedin} style={styles.linkText}>LinkedIn</Link>
                    </View>
                  )}
                  {personalInfo.website && (
                    <View style={styles.contactRow}>
                      <Text style={styles.icon}>🌐</Text>
                      <Link src={personalInfo.website} style={styles.linkText}>Portfolio</Link>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <View style={styles.sectionDivider} />
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            <View style={styles.sectionDivider} />
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.dates}>
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {' - '}
                    {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                  </Text>
                </View>
                <Text style={styles.company}>
                  {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                </Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.sectionDivider} />
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.degree}>
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <Text style={styles.dates}>
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {' - '}
                    {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                  </Text>
                </View>
                <Text style={styles.institution}>
                  {edu.institution}{edu.location ? ` • ${edu.location}` : ''}
                </Text>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.sectionDivider} />
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill.name || skill} {skill.level && `(${skill.level})`}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.sectionDivider} />
            {projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{project.title}</Text>
                  {(project.startDate || project.endDate) && (
                    <Text style={styles.dates}>
                      {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {project.startDate && project.endDate && ' - '}
                      {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </Text>
                  )}
                </View>
                {project.technologies && (
                  <Text style={styles.company}>
                    Technologies: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                  </Text>
                )}
                {project.description && (
                  <Text style={styles.description}>{project.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
