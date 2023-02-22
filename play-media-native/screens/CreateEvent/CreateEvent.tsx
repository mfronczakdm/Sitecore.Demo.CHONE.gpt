import { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useQuery } from 'react-query';

import { FieldsView } from './FieldsView';
import { ReferencesView } from './ReferencesView';
import { RichTextView } from './RichTextView';
import { getAllSports } from '../../api/queries/getSports';
import { BottomActions } from '../../components/BottomActions/BottomActions';
import { Stepper } from '../../components/Stepper/Stepper';
import { LoadingScreen } from '../../features/LoadingScreen/LoadingScreen';
import { KeyboardAwareScreen } from '../../features/Screen/KeyboardAwareScreen';
import { generateID } from '../../helpers/uuid';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { Sport } from '../../interfaces/sport';
import { styles } from '../../theme/styles';

export const CreateEventScreen = ({ navigation }) => {
  const [stateKey] = useState<string>(generateID());
  const { editMultiple, init, reset } = useContentItems();

  const { data: sports, isFetching: isFetchingSports } = useQuery('sports', () => getAllSports());
  const [title, setTitle] = useState();
  const [body, setBody] = useState<string>();
  const [sport, setSport] = useState<Sport>();
  const [teaser, setTeaser] = useState();
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ['Fields', 'Rich Text', 'References'];

  const onStepPress = useCallback((index: number) => {
    setStep(index);
  }, []);

  const handleSportChange = useCallback(
    (sportName: string) => {
      setSport(sports.find((sport) => sport.title === sportName));
    },
    [sports]
  );

  const displayedScreen = useMemo(() => {
    if (step === 0) {
      return (
        <FieldsView
          date={date}
          handleSportChange={handleSportChange}
          location={location}
          setDate={setDate}
          setLocation={setLocation}
          setShowDatePicker={setShowDatePicker}
          setTitle={setTitle}
          showDatePicker={showDatePicker}
          sport={sport}
          sports={sports}
          title={title}
        />
      );
    }

    if (step === 1) {
      return <RichTextView setBody={setBody} teaser={teaser} setTeaser={setTeaser} />;
    }

    return <ReferencesView stateKey={stateKey} />;
  }, [
    step,
    date,
    handleSportChange,
    location,
    showDatePicker,
    sport,
    sports,
    stateKey,
    title,
    teaser,
  ]);

  const onBack = useCallback(() => {
    if (step !== 0) {
      setStep(step - 1);
    }
  }, [step]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onNext = useCallback(() => {
    if (step !== 2) {
      setStep(step + 1);
      return;
    }

    editMultiple({
      id: stateKey,
      fields: {
        body,
        location,
        sport: sport || sports[0],
        teaser,
        timeAndDate: date,
        title,
      },
    });

    navigation.navigate('ReviewEvent', {
      stateKey,
      title: `Review ${title || 'Event'}`,
    });
  }, [
    body,
    date,
    editMultiple,
    location,
    navigation,
    sport,
    sports,
    stateKey,
    step,
    teaser,
    title,
  ]);

  useEffect(() => {
    // init global state on mount
    //
    if (stateKey) {
      init({
        id: stateKey,
        fields: {
          sport: null,
          featuredImage: null,
          relatedMedia: [],
          athletes: [],
          similarEvents: [],
        },
      });
    }

    // reset global state on unmount
    //
    return () => {
      reset({ id: stateKey });
    };
  }, [init, reset, stateKey]);

  if (isFetchingSports) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAwareScreen>
      <Stepper labels={steps} onPress={onStepPress} stepIndex={step} steps={steps} />
      {displayedScreen}
      <BottomActions>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <View>
            {step !== 0 && (
              <Button
                mode="outlined"
                labelStyle={styles.buttonLabel}
                style={styles.button}
                onPress={onBack}
              >
                Back
              </Button>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              mode="outlined"
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={onCancel}
            >
              Discard
            </Button>
            <Button
              mode="contained"
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={onNext}
            >
              {step !== 2 ? 'Next' : 'Review'}
            </Button>
          </View>
        </View>
      </BottomActions>
    </KeyboardAwareScreen>
  );
};
