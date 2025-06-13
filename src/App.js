import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Fade,
  Slide,
  useMediaQuery,
  Paper,
  Divider,
} from '@mui/material';
import {
  NavigateNext,
  NavigateBefore,
  PlayArrow,
  Pause,
  RestartAlt,
} from '@mui/icons-material';
import { animated, useSpring } from '@react-spring/web';
import { queerHistoryData } from './data';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px)');

  const currentData = queerHistoryData[currentSlide];

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: currentData.theme.color,
      },
      secondary: {
        main: currentData.theme.color,
      },
      background: {
        default: '#0a0a0a',
        paper: 'rgba(0, 0, 0, 0.6)',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.85)',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: isMobile ? '2rem' : '3rem',
        fontWeight: 700,
        marginBottom: '1rem',
      },
      h2: {
        fontSize: isMobile ? '1.5rem' : '2rem',
        fontWeight: 500,
        marginBottom: '0.5rem',
      },
      body1: {
        fontSize: isMobile ? '1rem' : '1.1rem',
        lineHeight: 1.6,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  });

  const backgroundStyle = useSpring({
    background: currentData.theme.background,
    config: { duration: 1000 },
  });

  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 101);
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, currentSlide]);

  useEffect(() => {
    if (!isPlaying) return;

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % queerHistoryData.length);
    }, 10000);

    return () => clearInterval(slideInterval);
  }, [isPlaying, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % queerHistoryData.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + queerHistoryData.length) % queerHistoryData.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSlideshow = () => {
    setCurrentSlide(0);
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <animated.div
        style={{
          ...backgroundStyle,
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 0',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                🏳️‍🌈 Queer History: A Journey Through Time
              </Typography>
              
              {/* Navigation Controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={prevSlide}
                  color="primary"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                  }}
                >
                  <NavigateBefore />
                </IconButton>
                
                <IconButton onClick={resetSlideshow} color="primary">
                  <RestartAlt />
                </IconButton>
                <IconButton onClick={togglePlayPause} color="primary">
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                
                <IconButton
                  onClick={nextSlide}
                  color="primary"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                  }}
                >
                  <NavigateNext />
                </IconButton>
                
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {currentSlide + 1} / {queerHistoryData.length}
                </Typography>
              </Box>
            </Box>
            {isPlaying && (
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
            )}
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ pt: 12, pb: 4 }}>
          <Fade in={true} timeout={800} key={currentSlide}>
            <Card
              sx={{
                maxWidth: '100%',
                margin: '0 auto',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                overflow: 'visible',
                position: 'relative',
              }}
            >
              {/* Year Badge */}
              <Chip
                label={currentData.year}
                sx={{
                  position: 'absolute',
                  top: -12,
                  right: 20,
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  zIndex: 1,
                }}
              />

              {/* Image */}
              <CardMedia
                component="img"
                height={isMobile ? "200" : isTablet ? "300" : "400"}
                image={currentData.image}
                alt={currentData.title}
                sx={{
                  objectFit: 'cover',
                  filter: 'brightness(0.4) contrast(1.1)',
                }}
              />

              <CardContent sx={{ padding: isMobile ? 2 : 4 }}>
                {/* Icon and Title */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                  <Typography variant="h1" sx={{ mr: 2, fontSize: isMobile ? '2rem' : '3rem' }}>
                    {currentData.icon}
                  </Typography>
                  <Box>
                    <Typography variant="h1" color="primary" sx={{
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
                      fontWeight: 700
                    }}>
                      {currentData.title}
                    </Typography>
                    <Typography variant="h2" sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
                      fontWeight: 500
                    }}>
                      {currentData.subtitle}
                    </Typography>
                  </Box>
                </Box>

                {/* Description */}
                <Typography variant="body1" sx={{ 
                  mb: 3, 
                  textAlign: 'justify',
                  color: '#ffffff',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                }}>
                  {currentData.description}
                </Typography>

                <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                {/* Key Figures */}
                <Paper sx={{ 
                  p: 2, 
                  mb: 3, 
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: 'primary.main',
                    fontWeight: 600,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                  }}>
                    Key Figures
                    <Typography variant="caption" sx={{ 
                      display: 'block', 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.75rem',
                      fontWeight: 400,
                      mt: 0.5
                    }}>
                      Click to learn more on Wikipedia
                    </Typography>
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {currentData.keyFigures.map((figure, index) => (
                      <Chip
                        key={index}
                        label={figure}
                        variant="outlined"
                        clickable
                        onClick={() => {
                          // Handle special cases for proper Wikipedia redirects
                          let wikipediaPath;
                          
                          if (figure === "Lambda Legal") {
                            wikipediaPath = "Lambda_Legal";
                          } else if (figure === "Gert Kasteel") {
                            // Redirect to Dutch LGBT organization since individual doesn't have page
                            wikipediaPath = "COC_Nederland";
                          } else if (figure === "Tyron Garner") {
                            // Redirect to Lawrence v. Texas case since individual doesn't have page
                            wikipediaPath = "Lawrence_v._Texas";
                          } else if (figure === "Terry Miller") {
                            // Redirect to It Gets Better Project since individual doesn't have page  
                            wikipediaPath = "It_Gets_Better_Project";
                          } else if (figure === "Beto de Jesus") {
                            // Redirect to IDAHOBIT since individual doesn't have page
                            wikipediaPath = "International_Day_Against_Homophobia,_Transphobia_and_Biphobia";
                          } else {
                            // Default case - use the figure name
                            wikipediaPath = encodeURIComponent(figure.replace(/\s+/g, '_'));
                          }
                          
                          const wikipediaUrl = `https://en.wikipedia.org/wiki/${wikipediaPath}`;
                          window.open(wikipediaUrl, '_blank', 'noopener,noreferrer');
                        }}
                        sx={{ 
                          borderColor: 'primary.main', 
                          color: '#ffffff',
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '& .MuiChip-label': {
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'secondary.main',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Paper>

                {/* Impact */}
                <Paper sx={{ 
                  p: 2, 
                  mb: 3, 
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 1, 
                    color: 'secondary.main',
                    fontWeight: 600,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                  }}>
                    Historical Impact
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontStyle: 'italic',
                    color: '#ffffff',
                    fontWeight: 400,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                  }}>
                    {currentData.impact}
                  </Typography>
                </Paper>

                {/* Sources */}
                <Paper sx={{ 
                  p: 2, 
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2,
                    color: '#ffffff',
                    fontWeight: 600,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                  }}>
                    Sources & Further Reading
                  </Typography>
                  <List dense>
                    {currentData.sources.map((source, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText
                          primary={source}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '0.9rem',
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontWeight: 400,
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </CardContent>
            </Card>
          </Fade>

          {/* Slide Indicators */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
              gap: 1,
            }}
          >
            {queerHistoryData.map((_, index) => (
              <Box
                key={index}
                onClick={() => goToSlide(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentSlide
                      ? theme.palette.primary.main
                      : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    transform: 'scale(1.2)',
                  },
                }}
              />
            ))}
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 6, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Created with ❤️ for the DEV.to Frontend Challenge: June Celebrations
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Celebrating LGBTQ+ history and the ongoing fight for equality
            </Typography>
          </Box>
        </Container>
      </animated.div>
    </ThemeProvider>
  );
};

export default App;
