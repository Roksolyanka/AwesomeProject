import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const imageOptimization = async (uri) => {
  try {
    const manipResult = await manipulateAsync(
      uri,
      [{ resize: { width: 120, height: 120 } }],
      { compress: 0.5, format: SaveFormat.JPEG }
    );
    return manipResult.uri;
  } catch (error) {
    console.error("Помилка оптимізації зображення:", error);
    return uri;
  }
};

export default imageOptimization;
