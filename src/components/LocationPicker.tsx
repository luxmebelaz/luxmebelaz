'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import type { CircleMarker, Map as LeafletMap } from 'leaflet';
import { Crosshair, Loader2, MapPin, X } from 'lucide-react';

export type LatLng = { lat: number; lng: number };

const BAKU: [number, number] = [40.4093, 49.8671];

// Xəritədə çatdırılma nöqtəsinin seçilməsi (OpenStreetMap — API açarı tələb etmir)
export default function LocationPicker({ value, onChange }: { value: LatLng | null; onChange: (v: LatLng | null) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const marker = useRef<CircleMarker | null>(null);
  const onChangeRef = useRef(onChange);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState('');

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let disposed = false;
    import('leaflet').then((L) => {
      if (disposed || !container.current || map.current) return;
      const m = L.map(container.current, { center: BAKU, zoom: 12, scrollWheelZoom: false });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap',
      }).addTo(m);
      m.on('click', (e) => onChangeRef.current({ lat: e.latlng.lat, lng: e.latlng.lng }));
      map.current = m;
      marker.current = L.circleMarker(BAKU, { radius: 10, color: '#111', weight: 3, fillColor: '#e4d093', fillOpacity: 1 });
    });
    return () => {
      disposed = true;
      map.current?.remove();
      map.current = null;
      marker.current = null;
    };
  }, []);

  // Seçilmiş nöqtəni xəritədə göstər
  useEffect(() => {
    const m = map.current;
    const mk = marker.current;
    if (!m || !mk) return;
    if (value) {
      mk.setLatLng([value.lat, value.lng]).addTo(m);
      if (!m.getBounds().contains([value.lat, value.lng])) m.setView([value.lat, value.lng], Math.max(m.getZoom(), 15));
    } else {
      mk.remove();
    }
  }, [value]);

  function locate() {
    if (!navigator.geolocation) return setGeoError('Brauzeriniz konumu dəstəkləmir.');
    setLocating(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const v = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        onChange(v);
        map.current?.setView([v.lat, v.lng], 17);
      },
      () => {
        setLocating(false);
        setGeoError('Konumu almaq mümkün olmadı. Xəritədə nöqtəni əl ilə seçin.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative rounded-2xl overflow-hidden border border-white/60">
        {/* data-lenis-prevent: səhifənin yumşaq sürüşməsi xəritənin sürüşdürülməsinə mane olmasın */}
        <div ref={container} data-lenis-prevent className="h-64 sm:h-72 w-full bg-[#dcdcdc] z-0" />
        <button
          type="button"
          onClick={locate}
          disabled={locating}
          className="absolute top-3 right-3 z-[400] inline-flex items-center gap-2 h-9 px-3 rounded-full bg-white text-sm font-semibold shadow hover:bg-neutral-100 disabled:opacity-70"
        >
          {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />} Mənim yerim
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-700">
        {value ? (
          <>
            <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-900">
              <MapPin className="w-4 h-4" /> Nöqtə seçildi ({value.lat.toFixed(5)}, {value.lng.toFixed(5)})
            </span>
            <button type="button" onClick={() => onChange(null)} className="inline-flex items-center gap-1 underline underline-offset-2">
              <X className="w-3.5 h-3.5" /> Seçimi sil
            </button>
          </>
        ) : (
          <span>Xəritəyə klikləyərək və ya “Mənim yerim” düyməsi ilə çatdırılma nöqtəsini seçin (istəyə bağlı).</span>
        )}
      </div>
      {geoError && <p className="text-xs font-semibold text-red-700">{geoError}</p>}
    </div>
  );
}
