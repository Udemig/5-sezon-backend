import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; // Gerekli dekoratörler ve araçlar

// @Schema dekoratörü, bu sınıfın bir MongoDB şeması olduğunu belirtir
// Varsayılan olarak, MongoDB'de bir koleksiyon oluşturur (örneğin, "users")
@Schema()
export class User {
  // @Prop dekoratörü, sınıfın bir özelliğini MongoDB belgesindeki bir alana eşler
  // { required: true, unique: true }: Bu alan zorunlu ve benzersiz olmalı
  // username, MongoDB'de bir string olarak saklanır ve her kullanıcı için уник (benzersiz) olmalıdır
  @Prop({ required: true, unique: true })
  userName: string;

  // displayName isteğe bağlı bir alan (required: false)
  // ? işareti, TypeScript'te bu özelliğin undefined olabileceğini belirtir
  // MongoDB'de bu alan yoksa veya null ise sorun çıkarmaz
  @Prop({ required: false })
  displayName?: string;

  // avtarUrl da isteğe bağlı bir alan
  // Ancak burada bir hata var: Tür "number" olarak belirtilmiş ama "avtarUrl" yazımı yanlış
  // Doğru yazımı "avatarUrl" olmalı (typo düzeltmesi önerilir)
  @Prop({ required: false })
  avtarUrl?: number;
}

// SchemaFactory.createForClass, User sınıfından bir Mongoose şeması oluşturur
// Bu şema, MongoDB ile iletişim kurmak için kullanılacak
// Oluşturulan şema, yukarıdaki @Prop tanımlamalarına dayanır
export const UserSchema = SchemaFactory.createForClass(User);
