from sklearn.metrics.pairwise import cosine_similarity

from tensorflow import keras
import numpy 

def extract_features(model, data):
    intermediate_layer_model = keras.Model(inputs=model.input, outputs=model.get_layer(index=-2).output)
    features = intermediate_layer_model.predict(data)
    return features

database_data = X
database_labels = yy
title = df.title.tolist()

input_features = extract_features(model, test_data)
database_features = extract_features(model, database_data)

similarity_scores = cosine_similarity(input_features, database_features)

recommended_indices = np.argsort(similarity_scores[0])[::-1]
recommended_songs = [title[i] for i in recommended_indices[:5]]

for i,j in enumerate(recommended_songs):
    print(f"{i+1}번째 추천곡 -> {j}")