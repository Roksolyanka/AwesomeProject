import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const imageOptimization = async (uri) => {
  try {
    const manipResult = await manipulateAsync(
      uri,
      [{ resize: { height: 240 } }],
      { compress: 1, format: SaveFormat.JPEG }
    );
    return manipResult.uri;
  } catch (error) {
    console.error("Помилка оптимізації зображення:", error);
    return uri;
  }
};

export default imageOptimization;
